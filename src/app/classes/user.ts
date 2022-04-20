declare var changeTextToArray: any;
declare var addNewLinesToText: any;

export class User {
    public name: string = '';
    public firstName: string = '';
    public lastName: string = '';
    public id: number = 0;
    public gender: string = '';
    public email: string = '';
    public rate: string = '';
    public city: string = '';
    public startupFees: string = '';
    public nudeFlg: boolean = false;
    public boudoirFlg: boolean = false;
    public fashionFlg: boolean = false;
    public fitnessFlg: boolean = false;
    public paintFlg: boolean = false;
    public eroticFlg: boolean = false;
    public nudeFees: number = 0;
    public bio: Array<string> = [];
    public availability: Array<string> = [];
    public lastLogin: string = '';
    public lastUpd: string = '';
    public created: string = '';
    public photogFlg: boolean = false;
    public modelFlg: boolean = false;
    public imgFlg: boolean = false;
    public daysSinceLogin: number = 0;
    public hourlyRate: number = 0;
    public currentPortfolioImg: string = '';

    public lastActive: string = '';
    public src: string = '';
    public fileName: string = '';
    public imgNum: string = '';
    public imgString: string = '';
    public bioString: string = '';
    public availabilityString: string = '';
    public portfolioImages: Array<string> = [];
    public phone: string = '';
    public cityId: number = 0;
    public cityBase: string = '';
    public numImages: number = 0;
    public twoHourFlg: boolean = false;
    public currentPortfolioId: number = 0;

    constructor(line: string = '') {
        console.log(line);
        var c = line.split('|');
        if (c.length > 0) {
            var x = 0;
            this.firstName = c[x++];
            this.lastName = c[x++];
            this.id = parseInt(c[x++]);
            this.lastUpd = c[x++];
            this.email = c[x++];
            this.city = c[x++];
            this.gender = c[x++];
            this.rate = c[x++];
            this.startupFees = c[x++];
            this.nudeFlg = c[x++] == 'Y';
            this.nudeFees = parseInt(c[x++]) || 0;
            var bio = c[x++];
            this.bioString = addNewLinesToText(bio);
            this.bio = changeTextToArray(bio);
            var availability = c[x++];
            this.availabilityString = addNewLinesToText(availability);
            this.availability = changeTextToArray(availability);
            this.photogFlg = c[x++] == 'Y';
            this.modelFlg = c[x++] == 'Y';
            this.imgFlg = c[x++] == 'Y';
            this.lastLogin = c[x++];
            this.created = c[x++];
            this.daysSinceLogin = parseInt(c[x++]) || 0;
            this.fileName = c[x++];
            this.imgNum = c[x++];
            this.imgString = c[x++];
            this.boudoirFlg = c[x++] == 'Y';
            this.phone = c[x++];
            this.cityId = parseInt(c[x++]) || 1;
            this.cityBase = c[x++];
            this.fashionFlg = c[x++] == 'Y';
            this.fitnessFlg = c[x++] == 'Y';
            this.paintFlg = c[x++] == 'Y';
            this.eroticFlg = c[x++] == 'Y';
            this.twoHourFlg = c[x++] == 'Y';

            this.currentPortfolioId = 0;

            this.hourlyRate = parseInt(this.rate) || 0;
            this.lastActive = this.daysSinceLogin + ' days ago';
            if (this.daysSinceLogin == 0)
                this.lastActive = 'Today';
            if (this.daysSinceLogin == 1)
                this.lastActive = 'Yesterday';

            this.name = this.firstName + ' ' + this.lastName;
            if (this.gender == 'M')
                this.src = "assets/img/profileM.jpg";
            else
                this.src = "assets/img/profileF.jpg";

            if (this.imgFlg && this.fileName)
                this.src = "https://www.appdigity.com/fest/profiles/" + this.fileName + ".jpg";

            this.portfolioImages = [];
            var imageIds:any = [];
            if (this.imgString) {
                var nums = this.imgString.split(':');
                nums.forEach(element => {
                    if (element && parseInt(element) > 0) {
                        imageIds.push(element);
                        if (this.currentPortfolioId == 0)
                            this.currentPortfolioId = parseInt(element);
                        this.portfolioImages.push('https://www.appdigity.com/fest/portfolioImages/img' + this.id + '_' + element + '.jpg');
                    }
                });
                this.numImages = this.portfolioImages.length;
                if (this.numImages > 0)
                    this.currentPortfolioImg = this.portfolioImages[0];
            }
            this.imgString = imageIds.join(':');
        }
    }
}
