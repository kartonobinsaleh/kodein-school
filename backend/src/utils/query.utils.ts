/**
 * Standardized search configuration for Prisma
 */
export const buildSearchFilter = (search?: string, fields: string[] = []) => {
  if (!search || fields.length === 0) return {};

  return {
    OR: fields.map((field) => ({
      [field]: {
        contains: search,
        mode: 'insensitive',
      },
    })),
  };
};

/**
 * Pagination helper to calculate skip and take
 */
export const getPagination = (page?: string | number, limit?: string | number) => {
  const p = Math.max(1, Number(page || 1));
  const l = Math.max(1, Number(limit || 10));
  const skip = (p - 1) * l;
  
  return { skip, take: l, page: p, limit: l };
};

/**
 * Standard Meta Response
 */
export const buildMeta = (total: number, page: number, limit: number) => {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

/**
 * Common Query Parameters Interface
 */
export interface CommonQueryParams {
  search?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
