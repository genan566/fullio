import React from 'react'
import { CategoriesTrending } from '../types/CategorieTrendingType'

const CustomSelects = ({ categoriesTrending }: { categoriesTrending: CategoriesTrending[] }) => {
    return (
        <select name="" id="" className='px-2 mt-5 border border-white rounded-lg shadow-md'>
            {
                categoriesTrending.map(person => {
                    return <option value={person.id}>{person.name}</option>
                })
            }
        </select>
    )
}

export default CustomSelects