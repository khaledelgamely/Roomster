import image from'../../assets/ntf.png'
export default function NotFoundPage() {
  return (
    <div style={{textAlign: 'center', marginTop: '100px'}}>
      <h1 style={{fontSize: '3rem'}}>404 Not Found</h1>
      <p style={{fontSize: '1.5rem'}}>The page you are looking for does not exist.</p>
      <img src={image} alt="404 Not Found" style={{width: '300px', height: 'auto', marginTop: '50px'}} />
    </div>
  );
}
