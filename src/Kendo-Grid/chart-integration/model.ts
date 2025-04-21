

  export class Customer {
    public Id = "";
    public CompanyName = "";
    public ContactName = "";
    public ContactTitle = "";
    public Address?: string = "";
    public City = "";
    public PostalCode? = "";
    public Country? = "";
    public Phone? = "";
    public Fax? = "";
  }
  
  export class Category {
    public CategoryID?: number;
    public CategoryName?: string;
    public Description?: string;
  }
  export class Items {
    public ID?: string;
    public Product?: string;
    public Quantity?: number;
    public Price?: number;
    public Tax?: number;
    public Total?: number;
  }
  