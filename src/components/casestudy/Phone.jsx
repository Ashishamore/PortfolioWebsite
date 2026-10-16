// A screenshot in a simple phone bezel, drawn in the site's ink outline style
export default function Phone({ src, alt, className = '', rounded = 'rounded-[1.6rem]', loading = 'lazy' }) {
  return (
    <div className={`rounded-[2rem] border-2 border-ink bg-ink p-1.5 shadow-hard ${className}`}>
      <img
        src={src}
        alt={alt}
        width="600"
        height="1298"
        loading={loading}
        className={`block aspect-[600/1298] w-full bg-slate-950 object-cover object-top ${rounded}`}
      />
    </div>
  )
}
