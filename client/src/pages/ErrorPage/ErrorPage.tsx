import { Page } from "../../components";
import "./ErrorPage.style.scss";

function ErrorPage() {

  return (
    <Page>
      <div className="error-page">
        <h1>Error 404</h1>
        <p>Error has occured</p>
        <div>
          <img src="https://i.giphy.com/media/46zGsq0JNimhzfkABV/giphy.webp" width="800" height="500"/>
        </div>
      </div>
    </Page>
  );
}

export default ErrorPage;
