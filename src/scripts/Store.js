import Observable from "./Observable";

class Store extends Observable {
  constructor() {
    super();
    this.state = {
      deals: [],
      productFilters: [],
      providerFilter: null
    };
  }

  get deals() {
    return this.filter();
  }

  filter() {
    // filtering by _broadband_ **THEN** show the **4** broadband only deals
    console.log(this.state.deals);

    // filter out for broadband only

    const products = [...this.state.deals];

    if (this.state.productFilters[0] === "broadband") {
      const c = products.filter(item => {
        return (
          !item.productTypes.some(a => a === "TV") &&
          !item.productTypes.some(a => a === "Mobile")
        );
      });

      return c;
    } else {
      return products;
    }
  }

  setDeals(data) {
    this.state.deals = data;
    this.notify(this.state);
  }

  setProductFilter(value) {
    console.log(value);
    const filter = value.trim().toLowerCase();
    const index = this.state.productFilters.indexOf(filter);
    if (index === -1) {
      this.state.productFilters.push(filter);
    } else {
      this.state.productFilters.splice(index, 1);
    }

    this.notify(this.state);
  }

  setProviderFilter(value = null) {
    this.state.providerFilter = value;
    this.notify(this.state);
  }
}

export default Store;
