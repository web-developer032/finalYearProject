import "./ErrorNotification.css";

function ErrorNotification({ show, message }) {
    return (
        <div
            className={
                show ? "error-notification active" : "error-notification"
            }
        >
            <p>{message}</p>
        </div>
    );
}

export default ErrorNotification;
