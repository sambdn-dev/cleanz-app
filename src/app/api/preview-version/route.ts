export const dynamic = 'force-dynamic';

/** Révision du build réellement servi ; aucune donnée de compte ni de configuration. */
export async function GET() {
  return Response.json(
    { version: process.env.NEXT_PUBLIC_BUILD_ID || 'dev' },
    { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } },
  );
}
