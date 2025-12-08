import { ManuscriptDB } from '../api/lib/db';
import * as fs from 'fs';
import * as path from 'path';

// Helper to convert analysis object with {value, confidence} to just {value} for fine-tuning input
const cleanAnalysisForFineTuning = (analysis: any) => {
  if (!analysis) return {};

  const cleaned: any = {};
  for (const key in analysis) {
    if (Object.prototype.hasOwnProperty.call(analysis, key)) {
      const item = analysis[key];
      if (item && typeof item === 'object' && 'value' in item) {
        cleaned[key] = item.value;
      } else if (Array.isArray(item)) {
        cleaned[key] = item.map(subItem => {
          if (subItem && typeof subItem === 'object' && 'value' in subItem) {
            return subItem.value;
          }
          return subItem; // Handle geodata which has place directly
        });
      } else {
        cleaned[key] = item;
      }
    }
  }
  
  // Special handling for geodata to ensure it matches the original output structure
  if (cleaned.geodata) {
    cleaned.geodata = cleaned.geodata.map((geo: any) => {
        // Original schema didn't have confidence in 'place' directly, but in the item
        // Now it's {place: string, latitude: number, longitude: number, type: string, confidence: number}
        // For fine-tuning, we only want {place: string, latitude: number, longitude: number, type: string}
        const { confidence, ...rest } = geo;
        return rest;
    });
  }

  // Ensure entities are cleaned
  if (cleaned.entities) {
    for (const entityType in cleaned.entities) {
        if (Object.prototype.hasOwnProperty.call(cleaned.entities, entityType) && Array.isArray(cleaned.entities[entityType])) {
            cleaned.entities[entityType] = cleaned.entities[entityType].map((entity: any) => {
                if (entity && typeof entity === 'object' && 'value' in entity) {
                    return entity.value;
                }
                return entity;
            });
        }
    }
  }

  return cleaned;
};

async function exportForFineTuning() {
  // Ensure the output directory exists
  const outputDir = path.join(process.cwd(), 'finetuning_data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const outputPath = path.join(outputDir, 'finetuning_dataset.jsonl');
  let outputStream: fs.WriteStream;

  try {
    // Fetch all manuscripts that have analysis data
    // For a real fine-tuning scenario, you might want to filter for user-corrected data
    // For simplicity here, we'll take any completed analysis.
    // NOTE: ManuscriptDB.findByUserId is designed for pagination.
    // For a full export, we'd need to fetch all pages. For this script,
    // let's assume a large enough limit or implement full pagination.
    const allManuscripts = await ManuscriptDB.findByUserId('any_user_id_for_all_docs', 1000000); // Placeholder, actual implementation needs all users' docs

    if (allManuscripts.length === 0) {
      console.log('No manuscripts found with analysis data to export.');
      return;
    }

    outputStream = fs.createWriteStream(outputPath);

    for (const manuscript of allManuscripts) {
      if (manuscript.transcription && manuscript.analysis) {
        const prompt = `Analiza diplomáticamente el siguiente texto del manuscrito y extrae la información requerida en formato JSON. Texto: "${manuscript.transcription}"`;
        const completion = JSON.stringify(cleanAnalysisForFineTuning(manuscript.analysis));

        const example = {
          prompt,
          completion
        };
        outputStream.write(JSON.stringify(example) + '\n');
      }
    }

    outputStream.end();
    console.log(`✅ Dataset para fine-tuning exportado a: ${outputPath}`);
    console.log(`Se exportaron ${allManuscripts.length} ejemplos.`);

  } catch (error) {
    console.error('❌ Error durante la exportación para fine-tuning:', error);
  } finally {
    // The script should ideally connect to a specific user's documents or a general dataset.
    // The current ManuscriptDB.findByUserId needs 'any_user_id_for_all_docs' to be adjusted
    // or a new method to fetch all manuscripts across all users (if allowed/needed).
    console.log("\nNota: Este script asume que ManuscriptDB.findByUserId puede obtener todos los documentos o un ID de usuario válido.");
    console.log("Para un uso real, asegúrate de que el fetching de documentos sea el adecuado para tu dataset de fine-tuning (ej. filtrar por documentos corregidos, o iterar por usuarios).");
  }
}

// Check if running as a script directly
if (require.main === module) {
  exportForFineTuning();
}
