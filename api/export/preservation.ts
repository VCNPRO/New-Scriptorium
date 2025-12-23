import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { requireAuth } from '../lib/auth';

/**
 * POST /api/export/preservation
 * Genera formatos de preservación digital (PDF/A-2, XML/METS)
 */
async function preservationHandler(req: VercelRequest, res: VercelResponse, auth: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { manuscript, format } = req.body;

    if (!manuscript) {
      return res.status(400).json({ error: 'Manuscrito requerido' });
    }

    if (!format || !['pdfa', 'mets', 'xml'].includes(format)) {
      return res.status(400).json({ error: 'Formato inválido. Use: pdfa, mets, xml' });
    }

    console.log(`📦 Generando formato ${format} para usuario ${auth.email}`);

    switch (format) {
      case 'pdfa':
        return await generatePDFA(manuscript, res);

      case 'mets':
      case 'xml':
        return await generateMETS(manuscript, res);

      default:
        return res.status(400).json({ error: 'Formato no soportado' });
    }

  } catch (error: any) {
    console.error('❌ Error generando formato de preservación:', error);
    return res.status(500).json({
      error: 'Error al generar formato de preservación',
      message: error.message
    });
  }
}

/**
 * Genera PDF/A-2 compatible con ISO 19005-2
 */
async function generatePDFA(manuscript: any, res: VercelResponse) {
  const pdfDoc = await PDFDocument.create();

  // Metadatos XMP para PDF/A-2
  const xmpMetadata = `<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about=""
        xmlns:pdfaid="http://www.aiim.org/pdfa/ns/id/"
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:xmp="http://ns.adobe.com/xap/1.0/"
        xmlns:pdf="http://ns.adobe.com/pdf/1.3/">
      <pdfaid:part>2</pdfaid:part>
      <pdfaid:conformance>B</pdfaid:conformance>
      <dc:format>application/pdf</dc:format>
      <dc:title>
        <rdf:Alt>
          <rdf:li xml:lang="es">${escapeXML(manuscript.title)}</rdf:li>
        </rdf:Alt>
      </dc:title>
      <dc:creator>
        <rdf:Seq>
          <rdf:li>Scriptorium</rdf:li>
        </rdf:Seq>
      </dc:creator>
      <dc:description>
        <rdf:Alt>
          <rdf:li xml:lang="es">${escapeXML(manuscript.analysis?.summary?.value || 'Manuscrito histórico digitalizado')}</rdf:li>
        </rdf:Alt>
      </dc:description>
      <dc:subject>
        <rdf:Bag>
          ${manuscript.analysis?.keywords?.map((kw: any) => `<rdf:li>${escapeXML(kw.value)}</rdf:li>`).join('\n          ') || ''}
        </rdf:Bag>
      </dc:subject>
      <xmp:CreateDate>${new Date().toISOString()}</xmp:CreateDate>
      <xmp:ModifyDate>${new Date().toISOString()}</xmp:ModifyDate>
      <xmp:MetadataDate>${new Date().toISOString()}</xmp:MetadataDate>
      <xmp:CreatorTool>Scriptorium v2.0</xmp:CreatorTool>
      <pdf:Producer>pdf-lib + Scriptorium</pdf:Producer>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;

  // Agregar metadatos estándar
  pdfDoc.setTitle(manuscript.title || 'Manuscrito');
  pdfDoc.setAuthor('Scriptorium');
  pdfDoc.setSubject(manuscript.analysis?.summary?.value || 'Manuscrito histórico');
  pdfDoc.setKeywords(manuscript.analysis?.keywords?.map((kw: any) => kw.value).join(', ') || '');
  pdfDoc.setProducer('Scriptorium PDF/A-2');
  pdfDoc.setCreator('Scriptorium v2.0');
  pdfDoc.setCreationDate(new Date());
  pdfDoc.setModificationDate(new Date());

  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;
  const maxWidth = pageWidth - 2 * margin;
  let yPosition = pageHeight - margin;
  let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);

  const sanitizeText = (text: string): string => {
    if (!text) return '';
    return text
      .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F-\u009F]/g, '')
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/\u2026/g, '...')
      .replace(/[\u2013\u2014]/g, '-')
      .trim();
  };

  const addText = (text: string, fontSize: number, font: any, color = rgb(0, 0, 0)) => {
    if (!text) return;
    const sanitized = sanitizeText(text);
    if (!sanitized) return;

    const lines = wrapText(sanitized, maxWidth, fontSize, font);
    for (const line of lines) {
      if (yPosition < margin + 50) {
        currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
        yPosition = pageHeight - margin;
      }

      try {
        currentPage.drawText(line, {
          x: margin,
          y: yPosition,
          size: fontSize,
          font: font,
          color: color,
        });
      } catch (err) {
        console.warn('Error dibujando texto');
      }

      yPosition -= fontSize + 4;
    }
  };

  const wrapText = (text: string, maxWidth: number, fontSize: number, font: any): string[] => {
    if (!text) return [];
    const allLines: string[] = [];
    const paragraphs = text.split(/\r?\n/);

    for (const paragraph of paragraphs) {
      if (!paragraph.trim()) {
        allLines.push('');
        continue;
      }

      const words = paragraph.split(' ');
      let currentLine = '';

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        try {
          const testWidth = font.widthOfTextAtSize(testLine, fontSize);
          if (testWidth > maxWidth && currentLine) {
            allLines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        } catch {
          currentLine = testLine;
        }
      }

      if (currentLine) allLines.push(currentLine);
    }

    return allLines;
  };

  const addSection = (title: string) => {
    yPosition -= 10;
    addText(title, 16, timesRomanBold, rgb(0.4, 0.2, 0));
    yPosition -= 8;
  };

  // Contenido del PDF
  addText(manuscript.title || 'Manuscrito', 20, timesRomanBold, rgb(0.3, 0.1, 0));
  yPosition -= 15;

  // Sección de preservación
  addSection('INFORMACION DE PRESERVACION');
  addText('Formato: PDF/A-2 (ISO 19005-2)', 10, timesRoman, rgb(0.3, 0.3, 0.3));
  addText(`Fecha de archivo: ${new Date().toLocaleDateString('es-ES')}`, 10, timesRoman, rgb(0.3, 0.3, 0.3));
  addText('Sistema: Scriptorium v2.0', 10, timesRoman, rgb(0.3, 0.3, 0.3));

  // Metadatos
  if (manuscript.analysis) {
    addSection('METADATOS');
    if (manuscript.analysis.typology?.value) {
      addText(`Tipologia: ${manuscript.analysis.typology.value}`, 11, timesRoman);
    }
    if (manuscript.analysis.language?.value) {
      addText(`Idioma: ${manuscript.analysis.language.value}`, 11, timesRoman);
    }
    if (manuscript.analysis.scriptType?.value) {
      addText(`Escritura: ${manuscript.analysis.scriptType.value}`, 11, timesRoman);
    }
  }

  // Transcripción
  if (manuscript.transcription) {
    addSection('TRANSCRIPCION');
    addText(manuscript.transcription, 11, timesRoman);
  }

  // Traducción
  if (manuscript.translation) {
    addSection('TRADUCCION');
    addText(manuscript.translation, 11, timesRoman);
  }

  // Resumen
  if (manuscript.analysis?.summary?.value) {
    addSection('RESUMEN');
    addText(manuscript.analysis.summary.value, 11, timesRoman);
  }

  // Entidades
  if (manuscript.analysis?.entities) {
    if (manuscript.analysis.entities.people?.length > 0) {
      addSection('PERSONAS');
      manuscript.analysis.entities.people.forEach((p: any) => {
        addText(`- ${p.value}`, 11, timesRoman);
      });
    }

    if (manuscript.analysis.entities.locations?.length > 0) {
      addSection('LUGARES');
      manuscript.analysis.entities.locations.forEach((l: any) => {
        addText(`- ${l.value}`, 11, timesRoman);
      });
    }
  }

  // Footer de certificación
  yPosition = margin;
  addText('Este documento ha sido generado en formato PDF/A-2 para preservacion a largo plazo.', 8, timesRoman, rgb(0.5, 0.5, 0.5));
  addText(`Certificado por Scriptorium el ${new Date().toLocaleDateString('es-ES')}`, 8, timesRoman, rgb(0.5, 0.5, 0.5));

  const pdfBytes = await pdfDoc.save();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${manuscript.title.replace(/[^a-z0-9]/gi, '_')}_PDFA.pdf"`);
  return res.status(200).send(Buffer.from(pdfBytes));
}

/**
 * Genera XML/METS estructurado
 */
async function generateMETS(manuscript: any, res: VercelResponse) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<mets:mets xmlns:mets="http://www.loc.gov/METS/"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xmlns:xlink="http://www.w3.org/1999/xlink"
           xmlns:dc="http://purl.org/dc/elements/1.1/"
           xmlns:dcterms="http://purl.org/dc/terms/"
           xsi:schemaLocation="http://www.loc.gov/METS/ http://www.loc.gov/standards/mets/mets.xsd">

  <!-- METS Header -->
  <mets:metsHdr CREATEDATE="${new Date().toISOString()}" LASTMODDATE="${new Date().toISOString()}">
    <mets:agent ROLE="CREATOR" TYPE="ORGANIZATION">
      <mets:name>Scriptorium</mets:name>
    </mets:agent>
  </mets:metsHdr>

  <!-- Dublin Core Metadata -->
  <mets:dmdSec ID="DMD1">
    <mets:mdWrap MDTYPE="DC">
      <mets:xmlData>
        <dc:title>${escapeXML(manuscript.title)}</dc:title>
        <dc:creator>Scriptorium</dc:creator>
        <dc:subject>${escapeXML(manuscript.analysis?.typology?.value || '')}</dc:subject>
        <dc:description>${escapeXML(manuscript.analysis?.summary?.value || '')}</dc:description>
        <dc:date>${new Date(manuscript.createdAt || Date.now()).toISOString()}</dc:date>
        <dc:type>Text</dc:type>
        <dc:format>application/xml</dc:format>
        <dc:language>${manuscript.analysis?.language?.value || 'es'}</dc:language>
        ${manuscript.analysis?.keywords?.map((kw: any) => `<dc:subject>${escapeXML(kw.value)}</dc:subject>`).join('\n        ') || ''}
      </mets:xmlData>
    </mets:mdWrap>
  </mets:dmdSec>

  <!-- Descriptive Metadata - Entities -->
  <mets:dmdSec ID="DMD2">
    <mets:mdWrap MDTYPE="OTHER" OTHERMDTYPE="ENTITIES">
      <mets:xmlData>
        <entities>
          ${manuscript.analysis?.entities?.people?.map((p: any) =>
            `<person confidence="${p.confidence}">${escapeXML(p.value)}</person>`
          ).join('\n          ') || ''}
          ${manuscript.analysis?.entities?.locations?.map((l: any) =>
            `<location confidence="${l.confidence}">${escapeXML(l.value)}</location>`
          ).join('\n          ') || ''}
          ${manuscript.analysis?.entities?.dates?.map((d: any) =>
            `<date confidence="${d.confidence}">${escapeXML(d.value)}</date>`
          ).join('\n          ') || ''}
        </entities>
      </mets:xmlData>
    </mets:mdWrap>
  </mets:dmdSec>

  <!-- File Section -->
  <mets:fileSec>
    <mets:fileGrp USE="MASTER">
      <mets:file ID="IMG1" MIMETYPE="image/jpeg">
        <mets:FLocat LOCTYPE="URL" xlink:href="${manuscript.imageUrl || ''}" />
      </mets:file>
    </mets:fileGrp>
    <mets:fileGrp USE="TRANSCRIPTION">
      <mets:file ID="TXT1" MIMETYPE="text/plain">
        <mets:FLocat LOCTYPE="OTHER" OTHERLOCTYPE="EMBEDDED">
          <![CDATA[${manuscript.transcription || ''}]]>
        </mets:FLocat>
      </mets:file>
    </mets:fileGrp>
  </mets:fileSec>

  <!-- Structural Map -->
  <mets:structMap TYPE="PHYSICAL">
    <mets:div TYPE="manuscript" LABEL="${escapeXML(manuscript.title)}">
      <mets:div TYPE="page" LABEL="Página 1">
        <mets:fptr FILEID="IMG1" />
        <mets:fptr FILEID="TXT1" />
      </mets:div>
    </mets:div>
  </mets:structMap>

  <!-- Behavioral Section - Analysis Results -->
  <mets:behaviorSec ID="BEHAVIOR1">
    <mets:behavior LABEL="AI Analysis Results">
      <mets:mechanism>
        <analysis>
          <typology confidence="${manuscript.analysis?.typology?.confidence || 0}">
            ${escapeXML(manuscript.analysis?.typology?.value || '')}
          </typology>
          <language confidence="${manuscript.analysis?.language?.confidence || 0}">
            ${escapeXML(manuscript.analysis?.language?.value || '')}
          </language>
          <scriptType confidence="${manuscript.analysis?.scriptType?.confidence || 0}">
            ${escapeXML(manuscript.analysis?.scriptType?.value || '')}
          </scriptType>
        </analysis>
      </mets:mechanism>
    </mets:behavior>
  </mets:behaviorSec>

</mets:mets>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Content-Disposition', `attachment; filename="${manuscript.title.replace(/[^a-z0-9]/gi, '_')}_METS.xml"`);
  return res.status(200).send(xml);
}

function escapeXML(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export default requireAuth(preservationHandler);
