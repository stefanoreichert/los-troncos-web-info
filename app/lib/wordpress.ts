export type MenuItem = {
  name: string;
  description: string;
  price: string;
  image: string;
};

export type MenuGroups = Record<string, MenuItem[]>;

type WordPressRendered = {
  rendered?: string;
};

type WordPressMenuPost = {
  title?: WordPressRendered;
  excerpt?: WordPressRendered;
  content?: WordPressRendered;
  acf?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
    }>;
    "wp:term"?: Array<
      Array<{
        name?: string;
        taxonomy?: string;
      }>
    >;
  };
};

const DEFAULT_MENU_IMAGE = "/imagenes/ambiente-01.jpg";

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function stringField(source: Record<string, unknown> | undefined, names: string[]) {
  if (!source) return "";

  for (const name of names) {
    const value = source[name];

    if (typeof value === "string") return value.trim();
    if (typeof value === "number") return String(value);
    if (value && typeof value === "object" && "url" in value) {
      const url = (value as { url?: unknown }).url;
      if (typeof url === "string") return url.trim();
    }
  }

  return "";
}

function getFeaturedImage(post: WordPressMenuPost) {
  const acfImage = stringField(post.acf, ["image", "imagen", "photo", "foto"]);
  const metaImage = stringField(post.meta, ["image", "imagen", "photo", "foto"]);
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "";

  return acfImage || metaImage || featuredImage || DEFAULT_MENU_IMAGE;
}

function getCategory(post: WordPressMenuPost) {
  const fieldCategory = stringField(post.acf, ["category", "categoria", "menu_category"]);
  const metaCategory = stringField(post.meta, ["category", "categoria", "menu_category"]);
  const termCategory =
    post._embedded?.["wp:term"]
      ?.flat()
      .find((term) => term.taxonomy?.includes("categor"))?.name ?? "";

  return fieldCategory || metaCategory || termCategory || "Carta";
}

function mapMenuPost(post: WordPressMenuPost) {
  const name = stripHtml(post.title?.rendered ?? "");
  const description =
    stringField(post.acf, ["description", "descripcion", "detalle"]) ||
    stringField(post.meta, ["description", "descripcion", "detalle"]) ||
    stripHtml(post.excerpt?.rendered ?? post.content?.rendered ?? "");
  const price = stringField(post.acf, ["price", "precio"]) || stringField(post.meta, ["price", "precio"]);

  if (!name) return null;

  return {
    category: getCategory(post),
    item: {
      name,
      description,
      price,
      image: getFeaturedImage(post),
    },
  };
}

function getWordPressMenuUrl() {
  const apiUrl = process.env.WORDPRESS_API_URL;
  if (!apiUrl) return null;

  const endpoint = process.env.WORDPRESS_MENU_ENDPOINT ?? "/wp-json/wp/v2/menu_item";
  const url = new URL(endpoint, apiUrl);
  url.searchParams.set("_embed", "1");
  url.searchParams.set("per_page", process.env.WORDPRESS_MENU_PER_PAGE ?? "100");

  return url;
}

export async function getWordPressMenu(): Promise<MenuGroups | null> {
  const url = getWordPressMenuUrl();
  if (!url) return null;

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return null;

    const posts = (await response.json()) as WordPressMenuPost[];
    const groups: MenuGroups = {};

    for (const post of posts) {
      const mapped = mapMenuPost(post);
      if (!mapped) continue;

      groups[mapped.category] = groups[mapped.category] ?? [];
      groups[mapped.category].push(mapped.item);
    }

    return Object.keys(groups).length > 0 ? groups : null;
  } catch {
    return null;
  }
}
