import { CalendarEvent } from '../types/calendar';

export interface SearchResult {
  event: CalendarEvent;
  score: number;
  matchedFields: string[];
}

export interface SearchOptions {
  query: string;
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  location?: string;
  maxResults?: number;
}

export class EventSearchService {
  private stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'from', 'up', 'about', 'into', 'over', 'after', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'
  ]);

  searchEvents(events: CalendarEvent[], options: SearchOptions): SearchResult[] {
    const { query, tags, dateRange, location, maxResults = 50 } = options;
    
    if (!query.trim() && !tags?.length && !dateRange && !location) {
      return events.map(event => ({
        event,
        score: 1,
        matchedFields: []
      }));
    }

    let results = events.map(event => this.scoreEvent(event, options))
      .filter(result => result.score > 0);

    // Sort by score (highest first)
    results.sort((a, b) => b.score - a.score);

    // Apply max results limit
    if (maxResults > 0) {
      results = results.slice(0, maxResults);
    }

    return results;
  }

  private scoreEvent(event: CalendarEvent, options: SearchOptions): SearchResult {
    const { query, tags, dateRange, location } = options;
    let score = 0;
    const matchedFields: string[] = [];

    // Text search scoring - if there's a query, the event MUST match it
    if (query.trim()) {
      const queryScore = this.calculateTextScore(event, query);
      if (queryScore.score === 0) {
        // If there's a search query but no text match, return 0 score
        return { event, score: 0, matchedFields: [] };
      }
      score += queryScore.score;
      matchedFields.push(...queryScore.matchedFields);
    }

    // Tag filtering (must match if specified)
    if (tags && tags.length > 0) {
      const hasMatchingTag = event.tags.some(eventTag => 
        tags.some(searchTag => eventTag.toLowerCase().includes(searchTag.toLowerCase()))
      );
      if (!hasMatchingTag) {
        return { event, score: 0, matchedFields: [] };
      }
      matchedFields.push('tags');
      score += 0.5; // Boost for tag match
    }

    // Date range filtering
    if (dateRange) {
      if (event.startDate < dateRange.start || event.startDate > dateRange.end) {
        return { event, score: 0, matchedFields: [] };
      }
      matchedFields.push('date');
      score += 0.3; // Small boost for date match
    }

    // Location filtering
    if (location && event.location) {
      const locationMatch = event.location.toLowerCase().includes(location.toLowerCase());
      if (!locationMatch) {
        return { event, score: 0, matchedFields: [] };
      }
      matchedFields.push('location');
      score += 0.4; // Boost for location match
    }

    return { event, score, matchedFields };
  }

  private calculateTextScore(event: CalendarEvent, query: string): { score: number; matchedFields: string[] } {
    const searchTerms = this.tokenize(query);
    let totalScore = 0;
    const matchedFields: string[] = [];

    // Title search (highest weight)
    const titleScore = this.scoreText(event.title, searchTerms, 3.0);
    if (titleScore > 0) {
      totalScore += titleScore;
      matchedFields.push('title');
    }

    // Description search (medium weight)
    if (event.description) {
      const descScore = this.scoreText(event.description, searchTerms, 1.5);
      if (descScore > 0) {
        totalScore += descScore;
        matchedFields.push('description');
      }
    }

    // Location search (medium weight)
    if (event.location) {
      const locScore = this.scoreText(event.location, searchTerms, 2.0);
      if (locScore > 0) {
        totalScore += locScore;
        matchedFields.push('location');
      }
    }

    // Source name search (low weight)
    const sourceScore = this.scoreText(event.source.name, searchTerms, 1.0);
    if (sourceScore > 0) {
      totalScore += sourceScore;
      matchedFields.push('source');
    }

    // Tags search (medium weight)
    const tagsText = event.tags.join(' ');
    const tagsScore = this.scoreText(tagsText, searchTerms, 1.8);
    if (tagsScore > 0) {
      totalScore += tagsScore;
      matchedFields.push('tags');
    }

    return { score: totalScore, matchedFields };
  }

  private scoreText(text: string, searchTerms: string[], weight: number): number {
    if (!text || searchTerms.length === 0) return 0;

    const textLower = text.toLowerCase();
    const textTokens = this.tokenize(text);
    let score = 0;

    for (const term of searchTerms) {
      const termLower = term.toLowerCase();
      
      // Exact phrase match (highest score)
      if (textLower.includes(termLower)) {
        score += weight * 1.0;
      }
      
      // Word boundary match (medium score)
      const wordBoundaryRegex = new RegExp(`\\b${this.escapeRegex(termLower)}\\b`, 'i');
      if (wordBoundaryRegex.test(text)) {
        score += weight * 0.8;
      }
      
      // Partial word match (lower score)
      for (const token of textTokens) {
        if (token.includes(termLower)) {
          score += weight * 0.4;
        }
      }
      
      // Fuzzy match for typos (lowest score)
      if (this.fuzzyMatch(termLower, textTokens)) {
        score += weight * 0.2;
      }
    }

    return score;
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !this.stopWords.has(word));
  }

  private escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private fuzzyMatch(term: string, tokens: string[]): boolean {
    if (term.length < 4) return false;
    
    return tokens.some(token => {
      if (Math.abs(token.length - term.length) > 2) return false;
      
      // Simple edit distance check
      const maxDistance = Math.floor(term.length / 3);
      return this.editDistance(term, token) <= maxDistance;
    });
  }

  private editDistance(a: string, b: string): number {
    const matrix = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(null));
    
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
    
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        if (a[i - 1] === b[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    
    return matrix[a.length][b.length];
  }

  // Utility methods for search suggestions
  getSearchSuggestions(events: CalendarEvent[], query: string, limit: number = 5): string[] {
    const suggestions = new Set<string>();
    const queryLower = query.toLowerCase();

    for (const event of events) {
      // Title words
      this.extractSuggestions(event.title, queryLower, suggestions);
      
      // Location suggestions
      if (event.location) {
        this.extractSuggestions(event.location, queryLower, suggestions);
      }
      
      // Tag suggestions
      for (const tag of event.tags) {
        if (tag.toLowerCase().startsWith(queryLower)) {
          suggestions.add(tag);
        }
      }
      
      if (suggestions.size >= limit * 2) break; // Get more than needed for filtering
    }

    return Array.from(suggestions)
      .filter(s => s.toLowerCase().includes(queryLower))
      .slice(0, limit);
  }

  private extractSuggestions(text: string, query: string, suggestions: Set<string>): void {
    const words = text.split(/\s+/).filter(word => word.length > 2);
    
    for (const word of words) {
      const cleanWord = word.replace(/[^\w]/g, '').toLowerCase();
      if (cleanWord.startsWith(query) && cleanWord.length > query.length) {
        suggestions.add(word);
      }
    }
  }

  // Get popular search terms from events
  getPopularSearchTerms(events: CalendarEvent[], limit: number = 10): string[] {
    const termFrequency = new Map<string, number>();

    for (const event of events) {
      // Count terms from titles
      const titleTerms = this.tokenize(event.title);
      titleTerms.forEach(term => {
        termFrequency.set(term, (termFrequency.get(term) || 0) + 2); // Higher weight for titles
      });

      // Count terms from tags
      event.tags.forEach(tag => {
        const cleanTag = tag.toLowerCase();
        if (cleanTag.length > 2) {
          termFrequency.set(cleanTag, (termFrequency.get(cleanTag) || 0) + 1);
        }
      });
    }

    return Array.from(termFrequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([term]) => term);
  }
}