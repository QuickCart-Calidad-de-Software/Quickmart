import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/_lib/supabaseClient';

// GET - Obtener perfil del vendedor
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Se requiere el ID del usuario' },
        { status: 400 }
      );
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, username, name, role, created_at')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return NextResponse.json(
        { error: 'Error al obtener el perfil' },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ profile: user }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error inesperado al obtener el perfil' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar perfil del vendedor
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, name, location, email, phone, businessName, description } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'Se requiere el ID del usuario' },
        { status: 400 }
      );
    }

    // Validar que el usuario existe
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id, role')
      .eq('id', userId)
      .single();

    if (checkError || !existingUser) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Validar que el usuario es vendedor
    if (existingUser.role !== 'vendedor') {
      return NextResponse.json(
        { error: 'Solo los vendedores pueden actualizar este perfil' },
        { status: 403 }
      );
    }

    // Construir objeto de actualización solo con campos proporcionados
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) {
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Formato de email inválido' },
          { status: 400 }
        );
      }
      updateData.email = email;
    }

    // Nota: location, phone, businessName, description deberían estar en una tabla separada
    // de perfil de vendedor en una implementación completa. Por ahora, los guardamos
    // en campos adicionales si la tabla users los soporta, o los ignoramos.
    
    const { data: user, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      return NextResponse.json(
        { error: 'Error al actualizar el perfil' },
        { status: 500 }
      );
    }

    return NextResponse.json({ profile: user }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error inesperado al actualizar el perfil' },
      { status: 500 }
    );
  }
}
