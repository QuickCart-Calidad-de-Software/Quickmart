import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/_lib/supabaseClient';

// GET - Obtener productos del vendedor
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sellerId = searchParams.get('sellerId');

    if (!sellerId) {
      return NextResponse.json(
        { error: 'Se requiere el ID del vendedor' },
        { status: 400 }
      );
    }

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
        rating_count,
        created_at,
        updated_at
      `)
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching seller products:', error);
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

// POST - Crear un nuevo producto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sellerId, title, description, category, price, stock, image } = body;

    // Validación de campos requeridos
    if (!sellerId || !title || !price || stock === undefined) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: sellerId, title, price, stock' },
        { status: 400 }
      );
    }

    // Validación de tipos
    if (typeof price !== 'number' || price <= 0) {
      return NextResponse.json(
        { error: 'El precio debe ser un número positivo' },
        { status: 400 }
      );
    }

    if (typeof stock !== 'number' || stock < 0) {
      return NextResponse.json(
        { error: 'El stock debe ser un número no negativo' },
        { status: 400 }
      );
    }

    const { data: product, error } = await supabase
      .from('products')
      .insert([
        {
          seller_id: sellerId,
          title,
          description: description || null,
          short_description: description ? description.substring(0, 100) : null,
          category_id: category || null,
          price,
          stock,
          active: true,
          rating: null,
          rating_count: 0,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating product:', error);
      return NextResponse.json(
        { error: 'Error al crear el producto' },
        { status: 500 }
      );
    }

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error inesperado al crear el producto' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar un producto existente
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, sellerId, title, description, category, price, stock, active } = body;

    if (!id || !sellerId) {
      return NextResponse.json(
        { error: 'Se requieren los campos id y sellerId' },
        { status: 400 }
      );
    }

    // Validar que el producto pertenece al vendedor
    const { data: existingProduct, error: checkError } = await supabase
      .from('products')
      .select('seller_id')
      .eq('id', id)
      .single();

    if (checkError || !existingProduct) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    if (existingProduct.seller_id !== sellerId) {
      return NextResponse.json(
        { error: 'No tienes permisos para actualizar este producto' },
        { status: 403 }
      );
    }

    // Construir objeto de actualización solo con campos proporcionados
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) {
      updateData.description = description;
      updateData.short_description = description ? description.substring(0, 100) : null;
    }
    if (category !== undefined) updateData.category_id = category;
    if (price !== undefined) {
      if (typeof price !== 'number' || price <= 0) {
        return NextResponse.json(
          { error: 'El precio debe ser un número positivo' },
          { status: 400 }
        );
      }
      updateData.price = price;
    }
    if (stock !== undefined) {
      if (typeof stock !== 'number' || stock < 0) {
        return NextResponse.json(
          { error: 'El stock debe ser un número no negativo' },
          { status: 400 }
        );
      }
      updateData.stock = stock;
    }
    if (active !== undefined) updateData.active = active;

    const { data: product, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      return NextResponse.json(
        { error: 'Error al actualizar el producto' },
        { status: 500 }
      );
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error inesperado al actualizar el producto' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un producto
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const sellerId = searchParams.get('sellerId');

    if (!id || !sellerId) {
      return NextResponse.json(
        { error: 'Se requieren los parámetros id y sellerId' },
        { status: 400 }
      );
    }

    // Validar que el producto pertenece al vendedor
    const { data: existingProduct, error: checkError } = await supabase
      .from('products')
      .select('seller_id')
      .eq('id', id)
      .single();

    if (checkError || !existingProduct) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    if (existingProduct.seller_id !== sellerId) {
      return NextResponse.json(
        { error: 'No tienes permisos para eliminar este producto' },
        { status: 403 }
      );
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      return NextResponse.json(
        { error: 'Error al eliminar el producto' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Producto eliminado exitosamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error inesperado al eliminar el producto' },
      { status: 500 }
    );
  }
}
