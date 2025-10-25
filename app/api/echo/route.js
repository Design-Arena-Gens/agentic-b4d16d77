export async function POST(request) {
  try {
    const { message } = await request.json();
    return Response.json({ echo: message ?? null });
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
