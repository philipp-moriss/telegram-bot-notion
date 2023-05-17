
type Task = {
    icon : string,
    title: string,
}

export const pageDateParser = (fullPageData: any): Task => {
    const icon = fullPageData?.icon?.emoji;
 
    const title = fullPageData?.properties?.Name?.title?.map((property : any) => {
      return property["plain_text"];
    })[0];


    return (
        {
            icon,
            title,
        }
    )
}