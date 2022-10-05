let buildPage = () => {
  let sifiveLogo = document.createElement('div');
  sifiveLogo.className = 'sifive-logo';
  sifiveLogo.innerHTML = `          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="840.3375000000002"
            height="60"
            version="1.1"
            viewBox="0 0 560.2250000000001 40"
          >
            <path
              d="M5.17749553,20.7048794 L10.648873,3.98080429 L31.6145259,3.98080429 L33.7424329,10.4870777 L15.2226118,10.4870777 L14.0381753,14.1780161 L34.949517,14.1780161 L38.0932379,23.7904558 L21.1316995,36.1159249 L5.01187835,24.3958177 L15.8968873,24.3958177 L21.0837209,28.1668633 L31.3470483,20.7088472 L5.17749553,20.7048794 L5.17749553,20.7048794 Z M34.142254,0.0129758713 L8.1211449,0.0129758713 L0.0800715564,24.7221448 L21.1316995,39.9870241 L42.1833274,24.7166756 L34.142254,0.0129758713 L34.142254,0.0129758713 Z"
              fill="white"
            ></path>
            <path
              fill="white"
              d="M2.50 6.70L13.90 6.70L13.88 8.88L4.90 8.88L4.90 14.63L12.98 14.63L12.98 16.80L4.90 16.80L4.90 24.20L2.50 24.20L2.50 6.70ZM18.80 13.83Q19.45 12.40 20.65 11.66Q21.85 10.93 23.50 10.90L23.50 13.15Q21.48 13.08 20.23 14.20Q18.98 15.33 18.80 17.23L18.80 24.20L16.48 24.20L16.48 10.98L18.80 10.98L18.80 13.83ZM31.32 10.90Q34.40 10.90 35.98 12.71Q37.55 14.53 37.55 17.75Q37.55 18.25 37.52 18.50L27.07 18.50Q27.35 20.28 28.56 21.33Q29.77 22.38 31.55 22.38Q32.73 22.38 33.74 21.95Q34.75 21.53 35.50 20.75L36.77 22.08Q35.80 23.13 34.42 23.70Q33.05 24.28 31.38 24.28Q29.43 24.28 27.91 23.44Q26.40 22.60 25.56 21.08Q24.73 19.55 24.73 17.60Q24.73 15.65 25.56 14.14Q26.40 12.63 27.90 11.76Q29.40 10.90 31.32 10.90M35.45 16.70Q35.35 14.90 34.25 13.86Q33.15 12.83 31.35 12.83Q29.60 12.83 28.44 13.88Q27.27 14.93 27.05 16.70L35.45 16.70ZM46.03 10.90Q49.10 10.90 50.68 12.71Q52.25 14.53 52.25 17.75Q52.25 18.25 52.23 18.50L41.78 18.50Q42.05 20.28 43.26 21.33Q44.48 22.38 46.25 22.38Q47.43 22.38 48.44 21.95Q49.45 21.53 50.20 20.75L51.48 22.08Q50.50 23.13 49.13 23.70Q47.75 24.28 46.08 24.28Q44.13 24.28 42.61 23.44Q41.10 22.60 40.26 21.08Q39.43 19.55 39.43 17.60Q39.43 15.65 40.26 14.14Q41.10 12.63 42.60 11.76Q44.10 10.90 46.03 10.90M50.15 16.70Q50.05 14.90 48.95 13.86Q47.85 12.83 46.05 12.83Q44.30 12.83 43.14 13.88Q41.98 14.93 41.75 16.70L50.15 16.70ZM67.75 5.65L67.75 24.20L65.43 24.20L65.43 21.58Q64.68 22.90 63.41 23.61Q62.15 24.33 60.48 24.33Q58.60 24.33 57.16 23.46Q55.73 22.60 54.93 21.06Q54.13 19.53 54.13 17.55Q54.13 15.60 54.93 14.09Q55.73 12.58 57.16 11.73Q58.60 10.88 60.45 10.88Q62.15 10.88 63.43 11.58Q64.70 12.28 65.43 13.60L65.43 5.65L67.75 5.65M60.95 22.33Q62.25 22.33 63.26 21.73Q64.28 21.13 64.85 20.05Q65.43 18.98 65.43 17.63Q65.43 16.25 64.85 15.18Q64.28 14.10 63.26 13.50Q62.25 12.90 60.95 12.90Q59.65 12.90 58.64 13.51Q57.63 14.13 57.05 15.20Q56.48 16.28 56.48 17.63Q56.48 18.98 57.05 20.05Q57.63 21.13 58.64 21.73Q59.65 22.33 60.95 22.33ZM77.93 10.90Q79.90 10.90 81.44 11.75Q82.98 12.60 83.84 14.11Q84.70 15.63 84.70 17.58Q84.70 19.53 83.84 21.05Q82.98 22.58 81.44 23.43Q79.90 24.28 77.93 24.28Q75.93 24.28 74.39 23.43Q72.85 22.58 71.99 21.06Q71.13 19.55 71.13 17.58Q71.13 15.63 71.99 14.11Q72.85 12.60 74.39 11.75Q75.93 10.90 77.93 10.90M77.93 12.93Q76.63 12.93 75.61 13.53Q74.60 14.13 74.04 15.19Q73.48 16.25 73.48 17.60Q73.48 18.98 74.04 20.05Q74.60 21.13 75.61 21.71Q76.63 22.30 77.93 22.30Q79.20 22.30 80.21 21.71Q81.23 21.13 81.79 20.05Q82.35 18.98 82.35 17.60Q82.35 16.25 81.79 15.19Q81.23 14.13 80.21 13.53Q79.20 12.93 77.93 12.93ZM105.03 10.90Q107.30 10.90 108.60 12.28Q109.90 13.65 109.90 16.03L109.90 24.20L107.55 24.20L107.55 16.65Q107.55 14.98 106.64 14.03Q105.73 13.08 104.13 13.08Q102.25 13.13 101.18 14.40Q100.10 15.68 100.10 17.68L100.10 24.20L97.75 24.20L97.75 16.65Q97.75 14.98 96.85 14.03Q95.95 13.08 94.33 13.08Q92.45 13.13 91.36 14.40Q90.28 15.68 90.28 17.68L90.28 24.20L87.95 24.20L87.95 10.98L90.28 10.98L90.28 13.75Q91.58 10.95 95.20 10.90Q97.03 10.90 98.24 11.78Q99.45 12.65 99.88 14.23Q101.10 10.95 105.03 10.90ZM131.05 10.35Q129.82 9.58 128.51 9.19Q127.20 8.80 126.10 8.80Q124.58 8.80 123.66 9.39Q122.75 9.98 122.75 11.00Q122.75 11.93 123.30 12.51Q123.85 13.10 124.65 13.44Q125.45 13.78 126.88 14.23Q128.65 14.78 129.75 15.28Q130.85 15.78 131.63 16.76Q132.40 17.75 132.40 19.38Q132.40 20.88 131.59 22.00Q130.78 23.13 129.31 23.74Q127.85 24.35 125.95 24.35Q124.03 24.35 122.20 23.60Q120.38 22.85 119.05 21.60L120.13 19.53Q121.38 20.75 122.94 21.41Q124.50 22.08 125.98 22.08Q127.73 22.08 128.74 21.39Q129.75 20.70 129.75 19.53Q129.75 18.60 129.20 18.00Q128.65 17.40 127.81 17.05Q126.98 16.70 125.55 16.28Q123.80 15.75 122.70 15.25Q121.60 14.75 120.84 13.78Q120.08 12.80 120.08 11.20Q120.08 9.80 120.85 8.73Q121.63 7.65 123.03 7.08Q124.42 6.50 126.28 6.50Q127.85 6.50 129.36 6.96Q130.88 7.43 132.05 8.20L131.05 10.35ZM143.10 23.33Q141.57 24.30 140 24.30Q138.42 24.30 137.45 23.36Q136.47 22.43 136.47 20.53L136.47 13.20L134.60 13.20L134.60 11.43L136.47 11.43L136.47 7.88L138.82 7.88L138.82 11.43L142.88 11.43L142.88 13.20L138.82 13.20L138.82 20.10Q138.82 21.20 139.22 21.68Q139.63 22.15 140.42 22.15Q141.38 22.15 142.47 21.53L143.10 23.33ZM157.63 10.98L157.63 24.20L155.28 24.20L155.28 21.40Q153.97 24.23 150.38 24.28Q148.08 24.28 146.78 22.91Q145.47 21.55 145.47 19.15L145.47 10.98L147.83 10.98L147.83 18.53Q147.83 20.20 148.74 21.14Q149.65 22.08 151.25 22.08Q153.10 22.05 154.19 20.76Q155.28 19.48 155.28 17.48L155.28 10.98L157.63 10.98ZM174.47 5.65L174.47 24.20L172.15 24.20L172.15 21.58Q171.40 22.90 170.14 23.61Q168.88 24.33 167.20 24.33Q165.32 24.33 163.89 23.46Q162.45 22.60 161.65 21.06Q160.85 19.53 160.85 17.55Q160.85 15.60 161.65 14.09Q162.45 12.58 163.89 11.73Q165.32 10.88 167.18 10.88Q168.88 10.88 170.15 11.58Q171.43 12.28 172.15 13.60L172.15 5.65L174.47 5.65M167.68 22.33Q168.97 22.33 169.99 21.73Q171 21.13 171.57 20.05Q172.15 18.98 172.15 17.63Q172.15 16.25 171.57 15.18Q171 14.10 169.99 13.50Q168.97 12.90 167.68 12.90Q166.38 12.90 165.36 13.51Q164.35 14.13 163.78 15.20Q163.20 16.28 163.20 17.63Q163.20 18.98 163.78 20.05Q164.35 21.13 165.36 21.73Q166.38 22.33 167.68 22.33ZM179.15 10.98L181.47 10.98L181.47 24.20L179.15 24.20L179.15 10.98M180.30 5.70Q180.93 5.70 181.34 6.13Q181.75 6.55 181.75 7.20Q181.75 7.85 181.34 8.28Q180.93 8.70 180.30 8.70Q179.68 8.70 179.26 8.28Q178.85 7.85 178.85 7.20Q178.85 6.55 179.26 6.13Q179.68 5.70 180.30 5.70ZM191.50 10.90Q193.47 10.90 195.01 11.75Q196.55 12.60 197.41 14.11Q198.28 15.63 198.28 17.58Q198.28 19.53 197.41 21.05Q196.55 22.58 195.01 23.43Q193.47 24.28 191.50 24.28Q189.50 24.28 187.96 23.43Q186.42 22.58 185.56 21.06Q184.70 19.55 184.70 17.58Q184.70 15.63 185.56 14.11Q186.42 12.60 187.96 11.75Q189.50 10.90 191.50 10.90M191.50 12.93Q190.20 12.93 189.19 13.53Q188.17 14.13 187.61 15.19Q187.05 16.25 187.05 17.60Q187.05 18.98 187.61 20.05Q188.17 21.13 189.19 21.71Q190.20 22.30 191.50 22.30Q192.78 22.30 193.79 21.71Q194.80 21.13 195.36 20.05Q195.92 18.98 195.92 17.60Q195.92 16.25 195.36 15.19Q194.80 14.13 193.79 13.53Q192.78 12.93 191.50 12.93Z"
              transform="translate(47.5, 4)"
            ></path>
            <path
              fill="white"
              d="M3 6.73L13.53 6.73L13.53 7.75L4.05 7.75L4.05 15.30L12.45 15.30L12.45 16.35L4.05 16.35L4.05 24.20L3 24.20L3 6.73ZM27.20 11.18L27.20 24.20L26.18 24.20L26.18 20.73Q25.55 22.43 24.21 23.31Q22.88 24.20 20.95 24.23Q18.60 24.23 17.29 22.88Q15.98 21.53 15.98 19.13L15.98 11.18L17 11.18L17 18.93Q17 20.93 18.10 22.05Q19.20 23.18 21.18 23.18Q23.53 23.13 24.85 21.63Q26.18 20.13 26.18 17.55L26.18 11.18L27.20 11.18ZM38.80 11.15Q41.18 11.15 42.51 12.51Q43.85 13.88 43.85 16.25L43.85 24.20L42.80 24.20L42.80 16.45Q42.80 14.45 41.68 13.33Q40.55 12.20 38.55 12.20Q36.33 12.25 34.99 13.56Q33.65 14.88 33.48 17.15L33.48 24.20L32.43 24.20L32.43 11.18L33.48 11.18L33.48 14.50Q34.13 12.90 35.49 12.05Q36.85 11.20 38.80 11.15ZM57.65 13.73Q55.95 12.15 53.63 12.15Q52.08 12.15 50.85 12.85Q49.63 13.55 48.94 14.81Q48.25 16.08 48.25 17.68Q48.25 19.30 48.94 20.58Q49.63 21.85 50.85 22.55Q52.08 23.25 53.63 23.25Q54.93 23.25 56.03 22.78Q57.13 22.30 57.88 21.43L58.50 22.10Q57.63 23.13 56.36 23.68Q55.10 24.23 53.60 24.23Q51.78 24.23 50.33 23.39Q48.88 22.55 48.05 21.06Q47.23 19.58 47.23 17.70Q47.23 15.83 48.05 14.33Q48.88 12.83 50.33 11.99Q51.78 11.15 53.60 11.15Q55.00 11.15 56.19 11.63Q57.38 12.10 58.25 12.98L57.65 13.73ZM68.73 23.30Q67.35 24.23 65.95 24.23Q64.55 24.23 63.80 23.31Q63.05 22.40 63.05 20.60L63.05 12.40L61.15 12.40L61.15 11.50L63.05 11.50L63.05 8.28L64.05 8.28L64.05 11.50L68.48 11.50L68.48 12.40L64.05 12.40L64.05 20.48Q64.05 23.20 66.08 23.20Q67.23 23.20 68.33 22.45L68.73 23.30ZM71.90 11.18L72.93 11.18L72.93 24.20L71.90 24.20L71.90 11.18M72.43 6.53Q72.78 6.53 73.04 6.79Q73.30 7.05 73.30 7.43Q73.30 7.83 73.04 8.09Q72.78 8.35 72.43 8.35Q72.08 8.35 71.81 8.09Q71.55 7.83 71.55 7.43Q71.55 7.05 71.81 6.79Q72.08 6.53 72.43 6.53ZM83.18 11.15Q85.03 11.15 86.49 11.99Q87.95 12.83 88.78 14.31Q89.60 15.80 89.60 17.68Q89.60 19.58 88.78 21.06Q87.95 22.55 86.49 23.39Q85.03 24.23 83.18 24.23Q81.35 24.23 79.89 23.39Q78.43 22.55 77.59 21.06Q76.75 19.58 76.75 17.68Q76.75 15.80 77.59 14.31Q78.43 12.83 79.89 11.99Q81.35 11.15 83.18 11.15M83.18 12.15Q81.63 12.15 80.40 12.85Q79.18 13.55 78.48 14.81Q77.78 16.08 77.78 17.68Q77.78 19.30 78.48 20.58Q79.18 21.85 80.40 22.55Q81.63 23.25 83.18 23.25Q84.73 23.25 85.96 22.55Q87.20 21.85 87.89 20.58Q88.58 19.30 88.58 17.68Q88.58 16.08 87.89 14.81Q87.20 13.55 85.96 12.85Q84.73 12.15 83.18 12.15ZM99.78 11.15Q102.15 11.15 103.49 12.51Q104.83 13.88 104.83 16.25L104.83 24.20L103.78 24.20L103.78 16.45Q103.78 14.45 102.65 13.33Q101.53 12.20 99.53 12.20Q97.30 12.25 95.96 13.56Q94.63 14.88 94.45 17.15L94.45 24.20L93.40 24.20L93.40 11.18L94.45 11.18L94.45 14.50Q95.10 12.90 96.46 12.05Q97.83 11.20 99.78 11.15ZM114.48 6.73L127.33 6.73L127.33 7.75L121.43 7.75L121.43 24.20L120.38 24.20L120.38 7.75L114.48 7.75L114.48 6.73ZM130.23 11.18L131.25 11.18L131.25 24.20L130.23 24.20L130.23 11.18M130.75 6.53Q131.10 6.53 131.36 6.79Q131.63 7.05 131.63 7.43Q131.63 7.83 131.36 8.09Q131.10 8.35 130.75 8.35Q130.40 8.35 130.14 8.09Q129.88 7.83 129.88 7.43Q129.88 7.05 130.14 6.79Q130.40 6.53 130.75 6.53ZM152.88 11.15Q155.20 11.15 156.51 12.50Q157.82 13.85 157.82 16.25L157.82 24.20L156.80 24.20L156.80 16.45Q156.80 14.45 155.70 13.33Q154.60 12.20 152.63 12.20Q150.30 12.25 148.99 13.75Q147.68 15.25 147.68 17.83L147.68 24.20L146.65 24.20L146.65 16.45Q146.65 14.45 145.54 13.33Q144.43 12.20 142.47 12.20Q140.15 12.25 138.82 13.76Q137.50 15.28 137.50 17.83L137.50 24.20L136.47 24.20L136.47 11.18L137.50 11.18L137.50 14.60Q138.13 12.93 139.46 12.06Q140.80 11.20 142.75 11.15Q144.70 11.15 145.95 12.14Q147.20 13.13 147.55 14.93Q148.15 13.10 149.51 12.15Q150.88 11.20 152.88 11.15ZM162.60 11.18L163.63 11.18L163.63 24.20L162.60 24.20L162.60 11.18M163.13 6.53Q163.47 6.53 163.74 6.79Q164 7.05 164 7.43Q164 7.83 163.74 8.09Q163.47 8.35 163.13 8.35Q162.78 8.35 162.51 8.09Q162.25 7.83 162.25 7.43Q162.25 7.05 162.51 6.79Q162.78 6.53 163.13 6.53ZM175.22 11.15Q177.60 11.15 178.94 12.51Q180.28 13.88 180.28 16.25L180.28 24.20L179.22 24.20L179.22 16.45Q179.22 14.45 178.10 13.33Q176.97 12.20 174.97 12.20Q172.75 12.25 171.41 13.56Q170.07 14.88 169.90 17.15L169.90 24.20L168.85 24.20L168.85 11.18L169.90 11.18L169.90 14.50Q170.55 12.90 171.91 12.05Q173.28 11.20 175.22 11.15ZM196 11.18L196 22.78Q196 24.68 195.22 26.10Q194.45 27.53 193.02 28.30Q191.60 29.08 189.70 29.08Q188.17 29.08 186.89 28.54Q185.60 28.00 184.42 26.95L184.97 26.18Q186.02 27.13 187.16 27.61Q188.30 28.10 189.67 28.10Q192.10 28.10 193.55 26.66Q195 25.23 195 22.80L195 20.33Q194.32 21.90 192.92 22.79Q191.52 23.68 189.67 23.68Q187.95 23.68 186.57 22.88Q185.20 22.08 184.42 20.65Q183.65 19.23 183.65 17.43Q183.65 15.63 184.42 14.20Q185.20 12.78 186.56 11.96Q187.92 11.15 189.65 11.15Q191.50 11.15 192.90 12.05Q194.30 12.95 195 14.53L195 11.18L196 11.18M189.80 22.78Q191.27 22.78 192.46 22.09Q193.65 21.40 194.32 20.19Q195 18.98 195 17.45Q195 15.93 194.32 14.70Q193.65 13.48 192.46 12.79Q191.27 12.10 189.80 12.10Q188.32 12.10 187.14 12.79Q185.95 13.48 185.29 14.70Q184.63 15.93 184.63 17.45Q184.63 18.98 185.29 20.19Q185.95 21.40 187.13 22.09Q188.30 22.78 189.80 22.78ZM208.43 6.73L219.70 6.73L219.70 7.75L209.48 7.75L209.48 14.73L218.58 14.73L218.58 15.78L209.48 15.78L209.48 23.18L220.03 23.18L220.03 24.20L208.43 24.20L208.43 6.73ZM222.65 11.18L223.85 11.18L227.88 16.70L231.90 11.18L233.08 11.18L228.53 17.48L233.40 24.20L232.20 24.20L227.85 18.28L223.48 24.20L222.28 24.20L227.20 17.48L222.65 11.18ZM243.48 11.15Q245.28 11.15 246.71 11.99Q248.15 12.83 248.95 14.31Q249.75 15.80 249.75 17.70Q249.75 19.58 248.95 21.06Q248.15 22.55 246.73 23.39Q245.30 24.23 243.48 24.23Q241.58 24.23 240.14 23.31Q238.70 22.40 237.95 20.80L237.95 29.05L236.90 29.05L236.90 11.18L237.95 11.18L237.95 14.60Q238.70 12.98 240.14 12.06Q241.58 11.15 243.48 11.15M243.33 23.25Q244.88 23.25 246.11 22.54Q247.35 21.83 248.04 20.56Q248.73 19.30 248.73 17.70Q248.73 16.10 248.04 14.84Q247.35 13.58 246.11 12.85Q244.88 12.13 243.33 12.13Q241.78 12.13 240.55 12.85Q239.33 13.58 238.64 14.84Q237.95 16.10 237.95 17.70Q237.95 19.30 238.64 20.56Q239.33 21.83 240.55 22.54Q241.78 23.25 243.33 23.25ZM253.68 5.65L254.73 5.65L254.73 24.20L253.68 24.20L253.68 5.65ZM265.08 11.15Q266.93 11.15 268.39 11.99Q269.85 12.83 270.68 14.31Q271.50 15.80 271.50 17.68Q271.50 19.58 270.68 21.06Q269.85 22.55 268.39 23.39Q266.93 24.23 265.08 24.23Q263.25 24.23 261.79 23.39Q260.33 22.55 259.49 21.06Q258.65 19.58 258.65 17.68Q258.65 15.80 259.49 14.31Q260.33 12.83 261.79 11.99Q263.25 11.15 265.08 11.15M265.08 12.15Q263.53 12.15 262.30 12.85Q261.08 13.55 260.38 14.81Q259.68 16.08 259.68 17.68Q259.68 19.30 260.38 20.58Q261.08 21.85 262.30 22.55Q263.53 23.25 265.08 23.25Q266.63 23.25 267.86 22.55Q269.10 21.85 269.79 20.58Q270.48 19.30 270.48 17.68Q270.48 16.08 269.79 14.81Q269.10 13.55 267.86 12.85Q266.63 12.15 265.08 12.15ZM276.35 14.45Q276.98 12.88 278.21 12.04Q279.45 11.20 281.20 11.15L281.20 12.23Q279.08 12.23 277.80 13.54Q276.53 14.85 276.35 17.15L276.35 24.20L275.30 24.20L275.30 11.18L276.35 11.18L276.35 14.45ZM289.00 11.15Q290.88 11.15 292.26 12.01Q293.65 12.88 294.36 14.43Q295.08 15.98 295.05 17.98L283.68 17.98Q283.75 19.55 284.45 20.75Q285.15 21.95 286.35 22.61Q287.55 23.28 289.05 23.28Q290.38 23.28 291.51 22.81Q292.65 22.35 293.45 21.48L294.05 22.15Q293.13 23.15 291.83 23.69Q290.53 24.23 289.00 24.23Q287.18 24.23 285.73 23.39Q284.28 22.55 283.46 21.06Q282.65 19.58 282.65 17.70Q282.65 15.83 283.48 14.33Q284.30 12.83 285.74 11.99Q287.18 11.15 289.00 11.15M294.10 17.05Q293.95 14.80 292.58 13.45Q291.20 12.10 289.00 12.10Q286.80 12.10 285.35 13.46Q283.90 14.83 283.70 17.05L294.10 17.05ZM299.83 14.45Q300.45 12.88 301.69 12.04Q302.93 11.20 304.68 11.15L304.68 12.23Q302.55 12.23 301.28 13.54Q300.00 14.85 299.83 17.15L299.83 24.20L298.78 24.20L298.78 11.18L299.83 11.18L299.83 14.45Z"
              transform="translate(255.3, 4)"
            ></path>
          </svg>`;

  document.getElementsByClassName('site-brand')[0].appendChild(sifiveLogo);
  // };

  let cegHeader = document.createElement('header');
  cegHeader.className = 'headerClass';

  cegHeader.innerHTML = `<div class="menu-item">
        Empty 
      </div>
      <div class="menu-item dropdown">
        <a href="#">Sort</a>
        <div class="dropdown-content" id="sortMenu">
          <div class="dropdown-item">
            <label><input type="checkbox" /> Sort values 1</label>
          </div>
          <div class="dropdown-item">
            <label><input type="checkbox" /> Sort values 2</label>
          </div>
          <div class="dropdown-item">
            <label><input type="checkbox" /> Sort values 3</label>
          </div>
        </div>
      </div>
      <div class="menu-item dropdown">
        <a href="#">Experiment</a>
        <div class="dropdown-content" id="experimentMenu">
          </div>
        </div>
      </div>
      <div class="menu-item">
        <a href="#">About</a>
      </div>
      <div class="site-name">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="smallerSiFiveLogo"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="24.75"
          height="30"
          version="1.1"
          viewBox="0 0 59.5 40"
        >
          <path
            d="M5.17749553,20.7048794 L10.648873,3.98080429 L31.6145259,3.98080429 L33.7424329,10.4870777 L15.2226118,10.4870777 L14.0381753,14.1780161 L34.949517,14.1780161 L38.0932379,23.7904558 L21.1316995,36.1159249 L5.01187835,24.3958177 L15.8968873,24.3958177 L21.0837209,28.1668633 L31.3470483,20.7088472 L5.17749553,20.7048794 L5.17749553,20.7048794 Z M34.142254,0.0129758713 L8.1211449,0.0129758713 L0.0800715564,24.7221448 L21.1316995,39.9870241 L42.1833274,24.7166756 L34.142254,0.0129758713 L34.142254,0.0129758713 Z"
            fill="white"
          ></path>
          <path fill="white" d="" transform="translate(47.5, 4)"></path>
          <path fill="white" d="" transform="translate(49.5, 4)"></path>
        </svg>
      </div>`;

  // document.body.appendChild(cegHeader);
  // // };

  function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  var topElement = document.getElementById('foo');

  insertAfter(topElement, cegHeader);
};
module.exports = { buildPage };
