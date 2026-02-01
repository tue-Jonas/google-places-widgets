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

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-xl font-bold text-blue-900 mb-3">2. Google Rezensionen (Datenschutzfreundliche Einbindung)</h2>
          <p className="mb-4">
            <em>
              Hinweis: Dieser Text gilt für die Implementierung mittels <strong>Server-Side Proxy</strong> ("Clean Solution"), 
              wie sie für datenschutzkonforme Anwendungen in Österreich empfohlen wird.
            </em>
          </p>
          <p>
            Wir binden auf unserer Website ausgewählte Rezensionen unseres Google Business Profils ein. 
            Technisch erfolgt dies über eine serverseitige Schnittstelle (API).
          </p>
          <p className="font-semibold mt-4">Datenverarbeitung:</p>
          <p>
            Beim Aufruf der Rezensionen baut Ihr Browser <strong>keine direkte Verbindung</strong> zu den Servern von Google auf. 
            Die Inhalte (Texte und Bilder) werden von unserem Server abgerufen und lokal zwischengespeichert („gecached“). 
            Es werden durch die Anzeige der Rezensionen keine Daten (wie Ihre IP-Adresse) an Google übertragen.
          </p>
          <p className="font-semibold mt-4">Rechtsgrundlage:</p>
          <p>
            Die Verarbeitung erfolgt auf Basis unseres berechtigten Interesses (<strong>Art. 6 Abs. 1 lit. f DSGVO</strong>) 
            an einer authentischen Darstellung unserer Dienstleistungen und Kundenzufriedenheit.
          </p>
        </section>

        <section className="opacity-75 grayscale hover:grayscale-0 transition-all duration-300 p-6 rounded-lg border border-gray-200 mt-8">
          <h2 className="text-xl font-bold text-gray-700 mb-3">Alternative: Direkte Einbindung (Standard API)</h2>
          <p className="text-sm text-gray-500 mb-4">
            <em>(Falls Bilder direkt von Google-Servern geladen werden - erfordert Cookie Banner)</em>
          </p>
          <p>
            <strong>Google Rezensionen</strong><br/>
            Wir binden auf unserer Website Rezensionen von Google Maps ein (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland).
          </p>
          <p className="mt-2">
            <strong>Datenverarbeitung:</strong> Durch das Laden der Rezensionen (insbesondere der Profilbilder der Verfasser) 
            baut Ihr Browser eine direkte Verbindung zu den Servern von Google auf. Hierbei können Daten (u.a. Ihre IP-Adresse) 
            an Google übermittelt und ggf. Cookies gesetzt werden.
          </p>
          <p className="mt-2">
            <strong>Rechtsgrundlage:</strong> Die Verarbeitung erfolgt auf Basis Ihrer Einwilligung (<strong>Art. 6 Abs. 1 lit. a DSGVO</strong>), 
            die Sie über unseren Cookie-Banner erteilt haben.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
          <p>
            <strong>Technischer Hinweis zur DSGVO-Compliance:</strong><br/>
            Um die "Clean Solution" zu gewährleisten, müssen Profilbilder der Rezensenten über einen eigenen Proxy-Endpunkt 
            (z.B. <code>/api/images/proxy?url=...</code>) ausgeliefert werden, anstatt sie direkt von 
            <code>lh3.googleusercontent.com</code> zu laden.
          </p>
        </div>
      </div>
    </div>
  );
};
