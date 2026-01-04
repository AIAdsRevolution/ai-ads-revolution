type SupabaseResult<T = any> = Promise<{ data: T; error: null }>;

function tableApi() {
  return {
    select: async (..._args: any[]): SupabaseResult<any[]> => ({ data: [], error: null }),
    insert: async (_payload: any): SupabaseResult<null> => ({ data: null, error: null }),
    update: async (_payload: any): SupabaseResult<null> => ({ data: null, error: null }),
    delete: async (): SupabaseResult<null> => ({ data: null, error: null }),
    eq: (..._args: any[]) => tableApi(),
    order: (..._args: any[]) => tableApi(),
    limit: (..._args: any[]) => tableApi()
  };
}

export const supabase = {
  from: (_table: string) => tableApi()
};
