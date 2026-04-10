export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-black mb-8">Privacy Policy</h1>
      <section className="space-y-6 text-sm">
        <p>En SIMRI LAB, accesible desde simri-lab.com, una de nuestras principales prioridades es la privacidad de nuestros visitantes.</p>
        
        <h2 className="text-xl font-bold">1. Información que recopilamos</h2>
        <p>SIMRI LAB no requiere que los usuarios se registren para realizar las pruebas. Sin embargo, recopilamos datos no personales como el tipo de navegador y la configuración de idioma para mejorar la experiencia del usuario.</p>

        <h2 className="text-xl font-bold">2. Cookies de Google AdSense</h2>
        <p>Google es uno de los proveedores externos de nuestro sitio. También utiliza cookies, conocidas como cookies de DART, para publicar anuncios a los visitantes de nuestro sitio según su visita a simri-lab.com y otros sitios en Internet.</p>

        <h2 className="text-xl font-bold">3. Uso de los datos</h2>
        <p>Utilizamos la información recopilada para analizar tendencias, administrar el sitio y rastrear el movimiento de los usuarios en el sitio web.</p>
      </section>
      <a href="/" className="mt-8 inline-block text-pink-500 font-bold">← Volver al inicio</a>
    </main>
  );
}