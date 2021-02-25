export class TextModel{
    private textContent : String;
    private uniqueURL : String;

    constructor(content:String , URL: String){
            this.textContent = content;
            this.uniqueURL = URL;
    }
}