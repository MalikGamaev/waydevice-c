
const Footer = () => {
	return (
		<footer className="footer mt-auto">
    	<div style={{height: 'auto'}} className="container">

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <p className="mb-0">&copy; 2025 Все права защищены, Ваша компания</p>
		  <div className=" mb-2 mt-2">
          <h5>Следите за нами</h5>
          <div>
            <i className="bi bi-facebook social-icon" role="button" aria-label="Facebook"></i>
            <i className="bi bi-instagram social-icon" role="button" aria-label="Instagram"></i>
            <i className="bi bi-twitter social-icon" role="button" aria-label="Twitter"></i>
            <i className="bi bi-youtube social-icon" role="button" aria-label="YouTube"></i>
          </div>
        </div>
      </div>
    </div>
  </footer>
	);
};

export default Footer;