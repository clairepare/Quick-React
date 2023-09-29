import './Popup.css';

const Popup = ({ children, open, close }) => (

    <div
      className={`popup ${open ? 'popup-show' : ''}`}
      tabIndex="-1"
      role="dialog"
      onClick={(evt) => { if (evt.target === evt.currentTarget) close(); }}
    >
      <div className="popup-dialog" role="document">
        <div className="popup-content">
          <div className="popup-header">
            <button type="button" className="btn-close" aria-label="Close"
              onClick={close}
            />
          </div>
          <div className="popup-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
  
  export default Popup;