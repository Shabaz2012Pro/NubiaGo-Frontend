
/**
 * Smart ID Resolution Utility
 * Handles both numeric and UUID formats seamlessly
 */

export interface IdMapping {
  numeric: string;
  uuid: string;
  slug?: string;
}

// Enhanced ID mapping with more products
const ID_MAPPINGS: IdMapping[] = [
  { numeric: '1', uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', slug: 'wireless-bluetooth-headphones' },
  { numeric: '2', uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d480', slug: 'smartphone-pro-max' },
  { numeric: '3', uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d481', slug: 'laptop-gaming-elite' },
  { numeric: '4', uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d482', slug: 'smart-watch-fitness' },
  { numeric: '5', uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d483', slug: 'wireless-earbuds-pro' },
  { numeric: '6', uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d484', slug: 'tablet-creative-studio' },
  { numeric: '7', uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d485', slug: 'camera-mirrorless-4k' },
  { numeric: '8', uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d486', slug: 'speaker-smart-home' },
  { numeric: '9', uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d487', slug: 'monitor-ultrawide-curved' },
  { numeric: '10', uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d488', slug: 'keyboard-mechanical-rgb' }
];

// Create reverse mappings for fast lookup
const NUMERIC_TO_UUID = new Map(ID_MAPPINGS.map(m => [m.numeric, m.uuid]));
const UUID_TO_NUMERIC = new Map(ID_MAPPINGS.map(m => [m.uuid, m.numeric]));
const SLUG_TO_UUID = new Map(ID_MAPPINGS.filter(m => m.slug).map(m => [m.slug!, m.uuid]));
const UUID_TO_SLUG = new Map(ID_MAPPINGS.filter(m => m.slug).map(m => [m.uuid, m.slug!]));

/**
 * Validates if a string is a valid UUID format
 */
export const isValidUUID = (id: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

/**
 * Validates if a string is a numeric ID
 */
export const isNumericId = (id: string): boolean => {
  return /^\d+$/.test(id);
};

/**
 * Resolves any ID format to UUID
 */
export const resolveToUUID = (id: string): string | null => {
  if (!id || id.trim() === '') {
    console.warn('Empty or invalid ID provided');
    return null;
  }

  const cleanId = id.trim();

  // If it's already a valid UUID, return it
  if (isValidUUID(cleanId)) {
    return cleanId;
  }

  // If it's a numeric ID, map it to UUID
  if (isNumericId(cleanId)) {
    const uuid = NUMERIC_TO_UUID.get(cleanId);
    if (uuid) {
      console.log(`Resolved numeric ID ${cleanId} to UUID ${uuid}`);
      return uuid;
    }
  }

  // If it's a slug, map it to UUID
  const uuidFromSlug = SLUG_TO_UUID.get(cleanId);
  if (uuidFromSlug) {
    console.log(`Resolved slug ${cleanId} to UUID ${uuidFromSlug}`);
    return uuidFromSlug;
  }

  // Generate a deterministic UUID from the input if no mapping exists
  const deterministicUUID = generateDeterministicUUID(cleanId);
  console.warn(`No mapping found for ID ${cleanId}, generated deterministic UUID: ${deterministicUUID}`);
  return deterministicUUID;
};

/**
 * Resolves UUID to numeric ID (if mapping exists)
 */
export const resolveToNumeric = (uuid: string): string | null => {
  if (!isValidUUID(uuid)) {
    return null;
  }
  return UUID_TO_NUMERIC.get(uuid) || null;
};

/**
 * Resolves UUID to slug (if mapping exists)
 */
export const resolveToSlug = (uuid: string): string | null => {
  if (!isValidUUID(uuid)) {
    return null;
  }
  return UUID_TO_SLUG.get(uuid) || null;
};

/**
 * Generates a deterministic UUID from any string input
 * This ensures consistent UUIDs for the same input
 */
export const generateDeterministicUUID = (input: string): string => {
  // Simple hash function to generate consistent values
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Convert hash to positive number and pad
  const positiveHash = Math.abs(hash).toString(16).padStart(8, '0');
  
  // Create a valid UUID v4 format
  return `${positiveHash.substring(0, 8)}-${positiveHash.substring(0, 4)}-4${positiveHash.substring(1, 4)}-a${positiveHash.substring(0, 3)}-${positiveHash.padEnd(12, '0').substring(0, 12)}`;
};

/**
 * Enhanced ID resolver with fallback strategies
 */
export const smartIdResolver = {
  /**
   * Resolves any ID to a valid UUID with multiple fallback strategies
   */
  resolve: (id: string): { uuid: string; source: 'mapping' | 'valid-uuid' | 'generated'; originalId: string } => {
    const originalId = id;
    const resolvedUUID = resolveToUUID(id);
    
    if (!resolvedUUID) {
      // Last resort: generate a fallback UUID
      const fallbackUUID = generateDeterministicUUID(id);
      return {
        uuid: fallbackUUID,
        source: 'generated',
        originalId
      };
    }

    // Determine the source of resolution
    let source: 'mapping' | 'valid-uuid' | 'generated' = 'generated';
    
    if (isValidUUID(id)) {
      source = 'valid-uuid';
    } else if (NUMERIC_TO_UUID.has(id) || SLUG_TO_UUID.has(id)) {
      source = 'mapping';
    }

    return {
      uuid: resolvedUUID,
      source,
      originalId
    };
  },

  /**
   * Gets user-friendly ID for display purposes
   */
  getDisplayId: (uuid: string): string => {
    const numeric = resolveToNumeric(uuid);
    const slug = resolveToSlug(uuid);
    
    // Prefer slug for SEO, then numeric for simplicity, then UUID
    return slug || numeric || uuid;
  },

  /**
   * Validates if an ID can be resolved
   */
  canResolve: (id: string): boolean => {
    return resolveToUUID(id) !== null;
  }
};

export default smartIdResolver;
