import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import 'react-app-polyfill/ie11';
import i18next from "i18next";

import "./css/app.css";
import "./css/bootstrap.css";
import "./css/toastr.css";
import { changeLayout, toggleScrollToTop } from "./utils/layout";
import { configureStore } from "./store/configureStore";
import { configureDOMPurify } from "./utils/DOMPurifyHook";
import { AppContainer } from "./AppContainer";
import { getPages, getFavorites } from "./store/actions/pagesActions";
import { getNews, getNewsCount } from "./store/actions/newsActions";
import { setLanguage } from "./store/actions/languageActions";
import { login } from "./store/actions/userActions";
import { Cookie } from "./Cookie";
import { ScrollOnLocationChange } from "./utils/ScrollOnLocationChange";

const store = configureStore({});
const cookie = new Cookie();
const localeCookie = cookie.getCookie("siteLocale") || navigator.language.slice(0, 2);
const token = cookie.getCookie("token");
store.dispatch(login({ token }));
store.dispatch(getNews({}));
store.dispatch(getNewsCount());
store.dispatch(getPages({}));
store.dispatch(getFavorites());

i18next.init({
	localeCookie,
	resources: require(`../public/i18next/${localeCookie}.json`)
});

i18next.changeLanguage(localeCookie);

store.dispatch(setLanguage(localeCookie))

configureDOMPurify();

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<ScrollOnLocationChange>
				<AppContainer />
			</ScrollOnLocationChange>
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);

document.addEventListener("DOMContentLoaded", changeLayout);
window.addEventListener("resize", changeLayout);
window.addEventListener("scroll", toggleScrollToTop);
