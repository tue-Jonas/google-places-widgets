import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Datenschutzerklärung (Demo)</h1>

      <div className="prose prose-slate max-w-none text-gray-700 space-y-6">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Impressum</h2>
          <p>
            Da dies eine Demo-Anwendung der <strong>TWB-Digital OG</strong> ist, gelten die Angaben im Haupt-Impressum der Agentur.
            Die Einbindung von Rezensionen ändert nichts an der Identität oder Geschäftstätigkeit des Betreibers.
          </p>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Google Rezensionen - Integrationsmöglichkeiten</h2>
          <p className="mb-4">
            Wir binden auf unserer Website ausgewählte Rezensionen unseres Google Business Profils ein. 
            Hierfür stehen technisch verschiedene Varianten zur Verfügung, die unterschiedliche Auswirkungen auf den Datenschutz haben.
          </p>

          <div className="space-y-8 mt-6">
            
            {/* Option A */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900">Option A: "Initials Only" (Privacy Mode)</h3>
              <p className="mt-2">
                Bei dieser Variante werden keine Profilbilder von Google-Servern geladen. Stattdessen werden generierte Initialen (z.B. "M.M.") angezeigt.
              </p>
              <ul className="list-disc pl-5 mt-2 text-sm">
                <li><strong>Datenfluss:</strong> Es wird keine direkte Verbindung zwischen dem Browser des Besuchers und den Google-Bildservern aufgebaut.</li>
                <li><strong>IP-Adresse:</strong> Die IP-Adresse des Besuchers wird nicht für das Laden von Bildern an Google übertragen.</li>
                <li><strong>Rechtsgrundlage:</strong> Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO).</li>
              </ul>
            </div>

            {/* Option B */}
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900">Option B: Server-Side Proxy ("Clean Solution")</h3>
              <p className="mt-2">
                Hierbei werden die Profilbilder technisch über unseren eigenen Server ("Proxy") ausgeladen und zwischengespeichert.
              </p>
              <ul className="list-disc pl-5 mt-2 text-sm">
                <li><strong>Datenfluss:</strong> Der Browser lädt Bilder ausschließlich von unserem Server.</li>
                <li><strong>IP-Adresse:</strong> Keine Übertragung an Google.</li>
                <li><strong>Rechtsgrundlage:</strong> Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO).</li>
              </ul>
            </div>

            {/* Option C */}
            <div className="border-l-4 border-gray-400 pl-4">
              <h3 className="text-lg font-bold text-gray-900">Option C: Standard Einbindung</h3>
              <p className="mt-2">
                Die Bilder werden direkt von den Google-Servern (`lh3.googleusercontent.com`) geladen.
              </p>
              <ul className="list-disc pl-5 mt-2 text-sm">
                <li><strong>Datenfluss:</strong> Direkte Verbindung zu Google.</li>
                <li><strong>IP-Adresse:</strong> Wird an Google (USA) übertragen.</li>
                <li><strong>Rechtsgrundlage:</strong> Einwilligung (Cookie-Banner / Art. 6 Abs. 1 lit. a DSGVO) erforderlich.</li>
              </ul>
            </div>

          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Vergleichstabelle</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Variante</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Bild-Quelle</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">IP-Transfer an Google</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Cookie-Banner</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">A. Initials Only</td>
                  <td className="px-6 py-4">Keine (Lokal generiert)</td>
                  <td className="px-6 py-4 text-green-600 font-bold">Nein</td>
                  <td className="px-6 py-4">Nein</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">B. Proxy</td>
                  <td className="px-6 py-4">Eigener Server</td>
                  <td className="px-6 py-4 text-green-600 font-bold">Nein</td>
                  <td className="px-6 py-4">Nein</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">C. Standard</td>
                  <td className="px-6 py-4">Google Server</td>
                  <td className="px-6 py-4 text-red-600 font-bold">Ja</td>
                  <td className="px-6 py-4">Erforderlich</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
