interface ICookie {
    name: string;
    options: any;
    value?: string;
}

export class Cookie {
    public setCookie({ name, value, options }: ICookie) {
        options = options || {};
        let expires = options.expires;

        if (typeof expires === "number" && expires) {
            const date = new Date();
            date.setTime(date.getTime() + expires * 1000);
            expires = options.expires = date;
        }

        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = value ? encodeURIComponent(value) : "";

        let updatedCookie = name + "=" + value;

        Object.keys(options).forEach((propName) => {
            updatedCookie += "; " + propName;
            const propValue = options[propName];

            if (!propValue) {
                updatedCookie += "=" + propValue;
            }
        });

        document.cookie = updatedCookie;
    }

    public getCookie(name: string) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) {
            return parts.pop()!.split(";").shift();
        }

        return [];
    }
}
