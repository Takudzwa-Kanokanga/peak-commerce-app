interface PriceFormatterProps {
  amount: number
  currency?: 'ZWL' | 'USD'
  className?: string
}

export default function PriceFormatter({ 
  amount, 
  currency = 'ZWL',
  className = ''
}: PriceFormatterProps) {
  const formatCurrency = (value: number, curr: string) => {
    if (curr === 'ZWL') {
      // Zimbabwe currency formatting: ZWL 1,234.56
      return `ZWL ${value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`
    } else {
      // USD formatting: $1,234.56
      return `$${value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`
    }
  }

  return <span className={className}>{formatCurrency(amount, currency)}</span>
}
