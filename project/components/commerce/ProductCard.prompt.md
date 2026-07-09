Storefront product tile — image, tag, title, rating, price, and a hover add-to-cart pill. Use in any product grid.

```jsx
<ProductCard image={url} brand="Hirot Studio" title="リネンシャツ" price={8800}
  original={12000} rating={4.5} reviews={128} tag="送料無料"
  onClick={openDetail} onAdd={addToCart} />
```

Lifts to the halo elevation on hover. `soldOut` greys the image and hides add-to-cart. Compose Price/Rating internally — don't pass them.
