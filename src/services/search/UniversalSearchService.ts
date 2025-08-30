import { CalendarEvent } from '../types/calendar';

// Unified search result types
export interface SearchableAttraction {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  url?: string;
  imageUrl?: string;
  type: 'attraction';
}

export interface SearchableBusiness {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  phone?: string;
  website?: string;
  rating: number;
  priceLevel: number;
  businessType: 'restaurant' | 'shop';
  features: string[];
  type: 'business';
}

export interface SearchableService {
  id: string;
  name: string;
  category: string;
  description: string;
  contact?: string;
  email?: string;
  website?: string;
  type: 'service';
}

export interface SearchableEvent {
  id: string;
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  tags: string[];
  source: { name: string; url?: string };
  type: 'event';
}

export type SearchableItem = SearchableAttraction | SearchableBusiness | SearchableService | SearchableEvent;

export interface UniversalSearchResult {
  item: SearchableItem;
  score: number;
  matchedFields: string[];
  type: 'attraction' | 'business' | 'service' | 'event';
}

export interface UniversalSearchOptions {
  query: string;
  types?: ('attraction' | 'business' | 'service' | 'event')[];
  maxResults?: number;
  minScore?: number;
}

export class UniversalSearchService {
  private stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'from', 'up', 'about', 'into', 'over', 'after', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'
  ]);

  search(
    attractions: SearchableAttraction[],
    businesses: SearchableBusiness[],
    services: SearchableService[],
    events: SearchableEvent[],
    options: UniversalSearchOptions
  ): {
    results: UniversalSearchResult[];
    resultsByType: {
      attractions: UniversalSearchResult[];
      businesses: UniversalSearchResult[];
      services: UniversalSearchResult[];
      events: UniversalSearchResult[];
    };
  } {
    const { query, types, maxResults = 50, minScore = 0.1 } = options;
    
    if (!query.trim()) {
      return {
        results: [],
        resultsByType: {
          attractions: [],
          businesses: [],
          services: [],
          events: []
        }
      };
    }

    let allResults: UniversalSearchResult[] = [];

    // Search each content type if not filtered
    if (!types || types.includes('attraction')) {
      const attractionResults = attractions.map(item => this.scoreAttraction(item, query))
        .filter(result => result.score >= minScore);
      allResults.push(...attractionResults);
    }

    if (!types || types.includes('business')) {
      const businessResults = businesses.map(item => this.scoreBusiness(item, query))
        .filter(result => result.score >= minScore);
      allResults.push(...businessResults);
    }

    if (!types || types.includes('service')) {
      const serviceResults = services.map(item => this.scoreService(item, query))
        .filter(result => result.score >= minScore);
      allResults.push(...serviceResults);
    }

    if (!types || types.includes('event')) {
      const eventResults = events.map(item => this.scoreEvent(item, query))
        .filter(result => result.score >= minScore);
      allResults.push(...eventResults);
    }

    // Sort by score (highest first)
    allResults.sort((a, b) => b.score - a.score);

    // Apply max results limit
    if (maxResults > 0) {
      allResults = allResults.slice(0, maxResults);
    }

    // Group results by type
    const resultsByType = {
      attractions: allResults.filter(r => r.type === 'attraction'),
      businesses: allResults.filter(r => r.type === 'business'),
      services: allResults.filter(r => r.type === 'service'),
      events: allResults.filter(r => r.type === 'event')
    };

    return {
      results: allResults,
      resultsByType
    };
  }

  private scoreAttraction(attraction: SearchableAttraction, query: string): UniversalSearchResult {
    let score = 0;
    const matchedFields: string[] = [];

    // Name search (highest weight)
    const nameScore = this.scoreText(attraction.name, query, 3.0);
    if (nameScore > 0) {
      score += nameScore;
      matchedFields.push('name');
    }

    // Description search (medium weight)
    const descScore = this.scoreText(attraction.description, query, 1.5);
    if (descScore > 0) {
      score += descScore;
      matchedFields.push('description');
    }

    // Category search (medium weight)
    const categoryScore = this.scoreText(attraction.category, query, 2.0);
    if (categoryScore > 0) {
      score += categoryScore;
      matchedFields.push('category');
    }

    // Address search (low weight)
    const addressScore = this.scoreText(attraction.address, query, 1.0);
    if (addressScore > 0) {
      score += addressScore;
      matchedFields.push('address');
    }

    return {
      item: attraction,
      score,
      matchedFields,
      type: 'attraction'
    };
  }

  private scoreBusiness(business: SearchableBusiness, query: string): UniversalSearchResult {
    let score = 0;
    const matchedFields: string[] = [];

    // Name search (highest weight)
    const nameScore = this.scoreText(business.name, query, 3.0);
    if (nameScore > 0) {
      score += nameScore;
      matchedFields.push('name');
    }

    // Description search (medium weight)
    const descScore = this.scoreText(business.description, query, 1.5);
    if (descScore > 0) {
      score += descScore;
      matchedFields.push('description');
    }

    // Category search (medium weight)
    const categoryScore = this.scoreText(business.category, query, 2.0);
    if (categoryScore > 0) {
      score += categoryScore;
      matchedFields.push('category');
    }

    // Features search (low-medium weight)
    const featuresText = business.features.join(' ');
    const featuresScore = this.scoreText(featuresText, query, 1.2);
    if (featuresScore > 0) {
      score += featuresScore;
      matchedFields.push('features');
    }

    // Address search (low weight)
    const addressScore = this.scoreText(business.address, query, 1.0);
    if (addressScore > 0) {
      score += addressScore;
      matchedFields.push('address');
    }

    // Boost high-rated businesses slightly
    if (business.rating >= 4.0) {
      score *= 1.1;
    }

    return {
      item: business,
      score,
      matchedFields,
      type: 'business'
    };
  }

  private scoreService(service: SearchableService, query: string): UniversalSearchResult {
    let score = 0;
    const matchedFields: string[] = [];

    // Name search (highest weight)
    const nameScore = this.scoreText(service.name, query, 3.0);
    if (nameScore > 0) {
      score += nameScore;
      matchedFields.push('name');
    }

    // Description search (medium weight)
    const descScore = this.scoreText(service.description, query, 1.5);
    if (descScore > 0) {
      score += descScore;
      matchedFields.push('description');
    }

    // Category search (medium weight)
    const categoryScore = this.scoreText(service.category, query, 2.0);
    if (categoryScore > 0) {
      score += categoryScore;
      matchedFields.push('category');
    }

    return {
      item: service,
      score,
      matchedFields,
      type: 'service'
    };
  }

  private scoreEvent(event: SearchableEvent, query: string): UniversalSearchResult {
    let score = 0;
    const matchedFields: string[] = [];

    // Title search (highest weight)
    const titleScore = this.scoreText(event.title, query, 3.0);
    if (titleScore > 0) {
      score += titleScore;
      matchedFields.push('title');
    }

    // Description search (medium weight)
    if (event.description) {
      const descScore = this.scoreText(event.description, query, 1.5);
      if (descScore > 0) {
        score += descScore;
        matchedFields.push('description');
      }
    }

    // Location search (medium weight)
    if (event.location) {
      const locScore = this.scoreText(event.location, query, 2.0);
      if (locScore > 0) {
        score += locScore;
        matchedFields.push('location');
      }
    }

    // Tags search (medium weight)
    const tagsText = event.tags.join(' ');
    const tagsScore = this.scoreText(tagsText, query, 1.8);
    if (tagsScore > 0) {
      score += tagsScore;
      matchedFields.push('tags');
    }

    // Source name search (low weight)
    const sourceScore = this.scoreText(event.source.name, query, 1.0);
    if (sourceScore > 0) {
      score += sourceScore;
      matchedFields.push('source');
    }

    // Boost upcoming events slightly
    const now = new Date();
    const daysDiff = Math.ceil((event.startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff >= 0 && daysDiff <= 30) {
      score *= 1.2; // Boost events in next 30 days
    }

    return {
      item: event,
      score,
      matchedFields,
      type: 'event'
    };
  }

  private scoreText(text: string, query: string, weight: number): number {
    if (!text || !query.trim()) return 0;

    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();
    const searchTerms = this.tokenize(query);
    const textTokens = this.tokenize(text);
    let score = 0;

    // Exact phrase match (highest score)
    if (textLower.includes(queryLower)) {
      score += weight * 1.0;
    }

    // Individual term matches
    for (const term of searchTerms) {
      const termLower = term.toLowerCase();
      
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
  getSearchSuggestions(
    attractions: SearchableAttraction[],
    businesses: SearchableBusiness[],
    services: SearchableService[],
    events: SearchableEvent[],
    query: string,
    limit: number = 5
  ): string[] {
    const suggestions = new Set<string>();
    const queryLower = query.toLowerCase();

    // Extract suggestions from all content types
    [...attractions, ...businesses, ...services].forEach(item => {
      this.extractSuggestions(item.name, queryLower, suggestions);
      this.extractSuggestions(item.category, queryLower, suggestions);
      this.extractSuggestions(item.description, queryLower, suggestions);
    });

    // Extract from events
    events.forEach(event => {
      this.extractSuggestions(event.title, queryLower, suggestions);
      if (event.description) {
        this.extractSuggestions(event.description, queryLower, suggestions);
      }
      if (event.location) {
        this.extractSuggestions(event.location, queryLower, suggestions);
      }
    });

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
}