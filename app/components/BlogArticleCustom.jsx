export default function BlogArticleCustom({article}) {
console.log(article, "articlearticlearticle")
    return (
    <section className="max-w-5xl mx-auto py-10">
        {article.image && (
        <img
          src={article.image.url}
          alt={article.image.altText}
          className="rounded-xl mb-8"
        />
      )}
      
      <h1 className="amittttt text-4xl font-bold mb-6">
        {article.title}
      </h1>

       <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />
    </section>
  );
}
