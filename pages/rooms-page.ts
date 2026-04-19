import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class RoomsPage extends BasePage {
    private readonly roomsHeader: Locator;
    private readonly logoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.roomsHeader = page.getByRole('link', { name: 'Rooms'});
        this.logoutButton = page.getByRole('button', { name: 'Logout'});
    
    }

    //Navigation method
    async navigateToAdminLogin(path: string = '/admin/rooms') {
        await this.page.goto(path);
    }

    //Action methods
    async logout(){
        await this.logoutButton.click({ force: true });
    }



    //Getter methods
    getRoomsHeader () {
        return this.roomsHeader;
    }


}