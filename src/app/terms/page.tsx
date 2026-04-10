export default function TermsPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-black mb-8">Terms of Service</h1>
      <section className="space-y-6 text-sm">
        <p>Al acceder a este sitio web, usted acepta estar sujeto a estos términos de servicio y a todas las leyes y regulaciones aplicables.</p>
        
        <h2 className="text-xl font-bold">1. Licencia de uso</h2>
        <p>Se concede permiso para acceder temporalmente a los materiales (información o software) en el sitio web de SIMRI LAB para visualización transitoria personal y no comercial solamente.</p>

        <h2 className="text-xl font-bold">2. Descargo de responsabilidad</h2>
        <p>Las pruebas de simri-lab.com se proporcionan con fines de entretenimiento. No deben considerarse asesoramiento profesional, médico o psicológico.</p>
      </section>
      <a href="/" className="mt-8 inline-block text-pink-500 font-bold">← Volver al inicio</a>
    </main>
  );
}