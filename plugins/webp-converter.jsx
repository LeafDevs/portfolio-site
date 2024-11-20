import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

// Vite plugin to convert images to WebP during build
export default function webpConverter() {
  return {
    name: 'webp-converter',
    async buildStart() {
      const publicDir = path.resolve('public')
      const imagesDir = path.join(publicDir, 'images')

      // Create images directory if it doesn't exist
      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true })
      }

      // Get all image files from public directory
      const imageFiles = fs.readdirSync(publicDir).filter(file => 
        /\.(jpg|jpeg|png)$/i.test(file)
      )

      // Convert each image to WebP
      for (const file of imageFiles) {
        const inputPath = path.join(publicDir, file)
        const fileName = path.parse(file).name
        const outputPath = path.join(imagesDir, `${fileName}.webp`)

        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath)
          
        // Delete original file after conversion
        fs.unlinkSync(inputPath)
      }

      // Update references in source files
      const srcDir = path.resolve('src')
      const updateReferences = (dir) => {
        const files = fs.readdirSync(dir)
        
        files.forEach(file => {
          const filePath = path.join(dir, file)
          const stat = fs.statSync(filePath)

          if (stat.isDirectory()) {
            updateReferences(filePath)
          } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
            let content = fs.readFileSync(filePath, 'utf8')
            
            imageFiles.forEach(imgFile => {
              const fileName = path.parse(imgFile).name
              content = content.replace(
                new RegExp(`/${fileName}\\.(jpg|jpeg|png)`, 'g'),
                `/images/${fileName}.webp`
              )
            })

            fs.writeFileSync(filePath, content)
          }
        })
      }

      updateReferences(srcDir)
    }
  }
}

