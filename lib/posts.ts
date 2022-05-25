const posts = [
  {
    id: 1,
    title: "8 Healthy Everyday Foods for Busy Women",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ligula justo, aco nsectetur adipisicing elitur tantas regiones barba rorum peat dibus obiit, tot mariataelitur uctor id posuere sed, gravida non odio. Consectetur adipisicing elitur tantas regiones barbarorum peat dibus obiit, tot mariataelitur",
    date: " November 29, 2022",
    image: "/images/blogs/image.png",
  },
  {
    id: 2,
    title: "Why We Need Our Bees To Keep Buzzing!",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ligula justo, aco nsectetur adipisicing elitur tantas regiones barba rorum peat dibus obiit, tot mariataelitur uctor id posuere sed, gravida non odio. Consectetur adipisicing elitur tantas regiones barbarorum peat dibus obiit, tot mariataelitur",
    date: " November 29, 2022",
    image: "/images/blogs/image1.png",
  },
  {
    id: 3,
    title: "Porridge is Comfort & Cosiness Together in a Bowl",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ligula justo, aco nsectetur adipisicing elitur tantas regiones barba rorum peat dibus obiit, tot mariataelitur uctor id posuere sed, gravida non odio. Consectetur adipisicing elitur tantas regiones barbarorum peat dibus obiit, tot mariataelitur",
    date: " November 29, 2022",
    image: "/images/blogs/image2.png",
  },
  {
    id: 4,
    title: "Mood swings make a vegetables arrangement",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ligula justo, aco nsectetur adipisicing elitur tantas regiones barba rorum peat dibus obiit, tot mariataelitur uctor id posuere sed, gravida non odio. Consectetur adipisicing elitur tantas regiones barbarorum peat dibus obiit, tot mariataelitur",
    date: " November 29, 2022",
    image: "/images/blogs/image3.png",
  },
  {
    id: 5,
    title: "From Now we are certified web agency",
    description:
      "Blog content also helps keep your social media presence going -- instead of asking your social media manager to come up with brand new original content for social media (or creating that content yourself), your blog can serve as that repository of content. You're strengthening your social reach with blog content and driving new website visitors to your blog via your social channels.",
    date: " November 29, 2022",
    image: "/images/blogs/image4.png",
  },
];

export async function getAllPost() {
  // const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  // const posts = await res.json();
  return posts;
}
export async function getPostById(id: number) {
  // const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  // const posts = await res.json();
  const post = posts.find((p) => p.id === id);
  return post;
}
