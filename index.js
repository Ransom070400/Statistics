class DescriptiveStatistics {
    constructor(data) {
      if (!Array.isArray(data) || data.length === 0) 
      this.data = data;
    }
  
    get mean() {
      return this.data.reduce((sum, value) => sum + value, 0) / this.data.length;
    }
  
    get median() {
      const sortedData = [...this.data].sort((a, b) => a - b);
      const midIndex = Math.floor(sortedData.length / 2);
      return sortedData.length % 2 === 0 ? (sortedData[midIndex - 1] + sortedData[midIndex]) / 2 : sortedData[midIndex];
    }
  
    get mode() {
      const frequencyTable = {};
      let maxCount = 0;
      let modeValue = null;
  
      for (const value of this.data) {
        if (frequencyTable[value]) {
          frequencyTable[value]++;
        } else {
          frequencyTable[value] = 1;
        }
  
        if (frequencyTable[value] > maxCount) {
          maxCount = frequencyTable[value];
          modeValue = value;
        }
      }
  
      return modeValue;
    }
  
    get range() {
      return Math.max(...this.data) - Math.min(...this.data);
    }
  
    get variance() {
      const mean = this.mean;
      return this.data.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (this.data.length - 1);
    }
  
    get standardDeviation() {
      return Math.sqrt(this.variance);
    }
  
    get interquartileRange() {
      const sortedData = [...this.data].sort((a, b) => a - b);
      const Q1 = this.quantile(0.25, sortedData);
      const Q3 = this.quantile(0.75, sortedData);
      return Q3 - Q1;
    }
  
    get meanAbsoluteDeviation() {
      const mean = this.mean;
      return this.data.reduce((sum, value) => sum + Math.abs(value - mean), 0) / this.data.length;
    }
  
    quantile(percentile, data) {
      const index = Math.floor((data.length - 1) * percentile);
      return data[index];
    }
  
    get summary() {
      return {
        mean: this.mean,
        median: this.median,
        mode: this.mode,
        range: this.range,
        variance: this.variance,
        standardDeviation: this.standardDeviation,
        interquartileRange: this.interquartileRange,
        meanAbsoluteDeviation: this.meanAbsoluteDeviation,
      };
    }
  }
  
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const stats = new DescriptiveStatistics(data);
  console.log(stats.summary);
