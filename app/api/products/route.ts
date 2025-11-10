import { NextResponse } from 'next/server';
import { supabase } from '@/app/_lib/supabaseClient';

export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        id,
        seller_id,
        title,
        description,
        short_description,
        category_id,
        price,
        stock,
        active,
        rating,
        rating_count
      `)
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json(
        { error: 'Error al obtener los productos' },
        { status: 500 }
      );
    }

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error inesperado al obtener los productos' },
      { status: 500 }
    );
  }
}
