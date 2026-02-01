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

        <section className="bg-green-50 p-6 rounded-lg border border-green-100">
          <div className="flex items-center mb-3">
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-2">EMPFOHLEN</span>
            <h2 className="text-xl font-bold text-green-900 m-0">2. Google Rezensionen ("Initials Only" / Privacy Mode)</h2>
          </div>
          <p className="mb-4">
            <em>
              Hinweis: Dies ist die <strong>"schlaueste" und einfachste Lösung</strong> für Datenschutz in Österreich. 
              Durch das Weglassen der Profilbilder werden fast alle Datenschutzprobleme technisch gelöst.
            </em>
          </p>
          <p>
            Wir binden auf unserer Website ausgewählte Rezensionen unseres Google Business Profils ein. 
            Dabei verzichten wir bewusst auf das Laden von Nutzer-Profilbildern von Google-Servern. 
            Stattdessen werden lediglich die Initialen der Rezensenten angezeigt (z.B. "M.M.").
          </p>
          <p className="font-semibold mt-4">Vorteile dieser Lösung:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>100% DSGVO-Sicher:</strong> Da der Browser keine Bilder von Google-Servern lädt, fließt keine IP-Adresse an Google.</li>
            <li><strong>Kein Cookie-Banner nötig:</strong> Die Anzeige erfolgt auf Basis "Berechtigtes Interesse" ohne Einwilligungsschranke.</li>
            <li><strong>Performance:</strong> Die Seite lädt schneller, da keine externen Bild-Ressourcen abgerufen werden müssen.</li>
          </ul>
          <p className="font-semibold mt-4">Rechtsgrundlage:</p>
          <p>
            Die Verarbeitung erfolgt auf Basis unseres berechtigten Interesses (<strong>Art. 6 Abs. 1 lit. f DSGVO</strong>) 
            an einer authentischen Darstellung unserer Dienstleistungen.
          </p>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-8">
          <h2 className="text-xl font-bold text-blue-900 mb-3">Option B: Server-Side Proxy ("Clean Solution")</h2>
          <p>
            Bei dieser technisch aufwändigeren Lösung werden die Profilbilder nicht direkt vom Nutzer-Browser bei Google geladen, 
            sondern von unserem eigenen Server "geproxied" und lokal ausgeliefert.
          </p>
          <p className="mt-2 text-sm">
            <strong>Vorteil:</strong> Original-Bilder sichtbar bei voller DSGVO-Konformität.<br/>
            <strong>Nachteil:</strong> Höherer Entwicklungsaufwand und Serverlast.
          </p>
        </section>

        <section className="opacity-75 grayscale hover:grayscale-0 transition-all duration-300 p-6 rounded-lg border border-gray-200 mt-8">
          <h2 className="text-xl font-bold text-gray-700 mb-3">Option C: Standard Einbindung (Nicht empfohlen)</h2>
          <p>
            Die klassische Einbindung lädt Bilder direkt von Google-Servern. Dies erfordert zwingend einen <strong>Cookie-Banner</strong> 
            und eine vorherige Einwilligung des Nutzers, da IP-Adressen an Google (USA) übertragen werden.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Vergleich der Integrations-Stufen</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Stufe</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Bilder</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">DSGVO</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Fazit</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">1. Standard</td>
                  <td className="px-6 py-4">Original (Google)</td>
                  <td className="px-6 py-4 text-red-600 font-bold">Problem (IP-Leak)</td>
                  <td className="px-6 py-4">Braucht Cookie Banner</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">2. Proxy</td>
                  <td className="px-6 py-4">Über eigenen Server</td>
                  <td className="px-6 py-4 text-green-600 font-bold">Sicher</td>
                  <td className="px-6 py-4">Teuer / Aufwändig</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-6 py-4 font-bold text-green-900">3. Text-Only</td>
                  <td className="px-6 py-4 font-bold text-green-900">Keine (Initialen)</td>
                  <td className="px-6 py-4 text-green-600 font-bold">Sicher</td>
                  <td className="px-6 py-4 font-bold text-green-900">Beste Balance (Empfehlung)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};