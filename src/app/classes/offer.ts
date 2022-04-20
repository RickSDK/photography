declare var changeTextToArray: any;
declare var addNewLinesToText: any;

export class Offer {
    public id: number = 0;
    public buyerId: number = 0;
    public sellerId: number = 0;
    public buyerPhone: string = '';
    public sellerPhone: string = '';
    public status: string = '';
    public created: string = '';
    public lastUpd: string = '';
    public typeNum: number = 0;
    public type: string = 'Portrait';
    public messageString: string = '';
    public replyString: string = '';
    public message: Array<string> = [];
    public reply: Array<string> = [];
    public seenFlg: boolean = false;

    public lastUpdBy: number = 0;
    public hours: number = 0;
    public totalCost: number = 0;
    public buyerName: string = '';
    public buyerPic: string = '';
    public sellerName: string = '';
    public sellerPic: string = '';
    public buyerEmail: string = '';
    public sellerEmail: string = '';
    public buyerCity: string = '';
    public sellerCity: string = '';
    public location: string = '';
    public day: string = '';
    public shootDay: string = '';
    public shootTime: string = '';
    public confirmLoc: boolean = false;
    public confirmTime: boolean = false;
    public showEditLocFLg: boolean = false;
    public showEditDayFLg: boolean = false;
    public showMessagesFlg: boolean = false;
    public messages: any = [];
    public messageLine: string = '';


    constructor(line: string = '') {
        var c = line.split('|');
        if (c.length > 0) {
            var x = 0;
            this.id = parseInt(c[x++]);
            this.buyerId = parseInt(c[x++]);
            this.sellerId = parseInt(c[x++]);
            this.status = c[x++];
            this.created = c[x++];
            this.lastUpd = c[x++];
            this.lastUpdBy = parseInt(c[x++]);
            this.typeNum = parseInt(c[x++]);
            this.hours = parseInt(c[x++]);
            this.totalCost = parseInt(c[x++]);
            var message = c[x++];
            this.messageString = addNewLinesToText(message);
            this.message = changeTextToArray(message);

            var reply = c[x++];
            this.replyString = addNewLinesToText(reply);
            this.reply = changeTextToArray(reply);

            this.seenFlg = c[x++] == 'Y';

            this.buyerName = c[x++];
            this.buyerPic = c[x++];
            this.sellerName = c[x++];
            this.sellerPic = c[x++];

            this.buyerPhone = c[x++];
            this.buyerEmail = c[x++];
            this.sellerPhone = c[x++];
            this.sellerEmail = c[x++];
            this.type = c[x++];

            this.buyerCity = c[x++];
            this.sellerCity = c[x++];

            this.day = c[x++];
            this.shootTime = c[x++];
            this.location = c[x++];
            this.confirmLoc = c[x++] == 'Y';
            this.confirmTime = c[x++] == 'Y';
            var messageLine = c[x++];

            this.messageLine = messageLine;
            var messages = messageLine.split('<m>');
            this.messages = [];
            messages.forEach(element => {
                var c = element.split(':');
                if (c.length > 2)
                    this.messages.push({ id: c[0], user_id: c[1], offer_id: c[2], firstName: c[3], message: addNewLinesToText(c[4]) });
            });


            //---------------------------------------
            this.showEditLocFLg = false;
            this.showEditDayFLg = false;
            this.showMessagesFlg = false;

            if (this.day) {
                var shootDay = new Date(this.day.replace(/-/g, "/") + ' ' + this.shootTime);
                console.log('this.day', this.day.replace(/-/g, "/"));
                console.log('this.shootTime', this.shootTime);
                console.log('shootDay', shootDay);
                this.shootDay = shootDay.toLocaleString();
                if (this.shootDay == 'Invalid Date')
                    this.shootDay = this.day + ' ' + this.shootTime;
            }
            else
                this.shootDay = 'TBD';

            if (this.type == "") {
                var types = ['Portrit', 'Bourdoir', 'Nude'];
                this.type = types[this.typeNum];
            }

            if (this.buyerPic)
                this.buyerPic = "https://www.appdigity.com/fest/profiles/" + this.buyerPic + ".jpg";
            else
                this.buyerPic = "assets/img/profileM.jpg";
            if (this.sellerPic)
                this.sellerPic = "https://www.appdigity.com/fest/profiles/" + this.sellerPic + ".jpg";
            else
                this.sellerPic = "assets/img/profileM.jpg";


        }
    }
}
