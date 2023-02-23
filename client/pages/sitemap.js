const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_BASE_API_URL

// function generateSiteMap(projects) {
//     return `<?xml version="1.0" encoding="UTF-8"?>
//       <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//         <!--We manually set the two URLs we know already-->
//         <url>
//           <loc>https://www.cryptotoolkit.xyz/</loc>
//         </url>
//         <url>
//           <loc>https://www.cryptotoolkit.xyz/about</loc>
//         </url>
//         ${
//           projects.data
//             ? projects.data.map(({ name }) => {
//                 return `
//                   <url>
//                     <loc>${`${EXTERNAL_DATA_URL}/project/${name.split(" ").join("")}`}</loc>
//                   </url>
//                 `;
//               }).join('')
//             : ''
//         }
//       </urlset>
//     `;
//   }

function generateSiteMap(projects, categories) {
  const urls = projects.data.concat(categories.data).map(({ name, category }) => {
    if (name) {
      return `
        <url>
          <loc>${`${EXTERNAL_DATA_URL}/project/${name.split(" ").join("")}`}</loc>
        </url>
      `;
    } else if (category) {
      return `
        <url>
          <loc>${`${EXTERNAL_DATA_URL}/category/${category.split(" ").join("")}`}</loc>
        </url>
      `;
    }
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!--We manually set the two URLs we know already-->
      <url>
        <loc>https://www.cryptotoolkit.xyz/</loc>
      </url>
      <url>
        <loc>https://www.cryptotoolkit.xyz/about</loc>
      </url>
      ${urls}
    </urlset>
  `;
}

  

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // get projects
  const response = await fetch(`${EXTERNAL_DATA_URL}/api/get-active-projects`);
  const projects = await response.json()

  // get categories
  const response2 = await fetch(`${EXTERNAL_DATA_URL}/api/get-all-categories`);
  const categories = await response2.json()

  // We generate the XML sitemap with the projects data
  const sitemap = generateSiteMap(projects, categories);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;