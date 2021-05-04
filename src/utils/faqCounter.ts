let faqCount: number = 0;

export function getId():string{
    faqCount++;
    return "faqComponent" + faqCount.toString();
}