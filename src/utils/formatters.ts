const categoryNames: Record<string, string> = {
  machine_roller: 'Roller Machines',
  machine_sorter: 'Optical Sorters',
  machine_dryer: 'Dryers',
  machine_die_casting: 'Die Casting Machines',
}

export const formatCategory = (category: string): string => {
  return (
    categoryNames[category] || category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  )
}

// Format price: multiply by 1000 since JSON prices are in thousands (9 = $9,000)
export const formatPrice = (price: number): string => {
  return (price * 1000).toLocaleString()
}
