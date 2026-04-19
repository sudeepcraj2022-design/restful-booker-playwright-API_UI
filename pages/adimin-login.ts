import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {
    private readonly loginHeading: Locator;
    private readonly usernameField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.loginHeading = page.getByRole('heading', {level: 2, name: 'Login'});
        this.usernameField = page.getByLabel('username');
        this.passwordField = page.getByLabel('password');
        this.loginButton = page.getByRole('button', {name: 'Login'});
    }

    //Navigation method
    async navigateToAdminLogin(path: string = '/admin') {
        await this.page.goto(path);
    }

    //Action methods
    async login(username: string, password: string){
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }


    //Getter methods
    getLoginHeading () {
        return this.loginHeading;
    }






}