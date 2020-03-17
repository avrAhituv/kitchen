export class Contact {
    firstName: string;
    lastName: string;
    phone: string;
    celular: string;
    celular2: string;
    email: string;
    googleId: string;
    displayName(){
        return this.firstName + ' ' + this.lastName;
    }
    /**
     *
     */
    constructor(item:any) {
        if(!item) return;
        this.googleId = item.resourceName;
        if(item.names && item.names.length){
            const name = item.names[0];
            this.firstName = name.givenName || '';
            this.lastName = name.familyName || '';
        }
        if(item.phoneNumbers){
            item.phoneNumbers.forEach(p => {
                switch (p.type) {
                    case 'mobile':
                        this.celular = p.value;
                        break;
                    case 'home':
                        this.phone = p.value;
                        break;
                    case 'work':
                        this.celular2 = p.value;
                        break;
                }
            });
        }
    }
}
