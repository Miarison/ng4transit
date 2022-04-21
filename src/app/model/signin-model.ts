export class SigninModel{
    private email: string | undefined;
    private password: string | undefined;

    public constructor(email: string, password: string){
        this.setEmail(email);
        this.setPassword(password);
    }

    public getEmail(): string | undefined{
        return this.email;
    }
    public getPassword(): string | undefined{
        return this.password;
    }

    public setEmail(email: string): void{
        this.email = email;
    }
    public setPassword(password: string): void{
        this.password = password;
    }
    
}