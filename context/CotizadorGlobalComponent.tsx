import React, { useEffect, useState } from 'react'
import { CotizadorActionsContext, CotizadorStateContext } from './CotizadorGlobalContext'
import { Recipe } from '@/types/recipe'
import { CtzGlobalProp } from '@/types/ctz'
import { Expenses } from '@/types/extraExpenses'
import { Ingredients } from '@/types/ingredients'
import useGetIngredients from '@/hooks/useGetIngredients'
import useUserInfo from '@/hooks/useUserInfo'

interface CotizadorProviderProps {
    children: React.ReactNode,
}

const CotizadorGlobalComponent:React.FC<CotizadorProviderProps> = ({ children }) => {  
    const { uid, userInfo, ctzUser, loading: userLoading } = useUserInfo()
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [expenses, setExpenses] = useState<Expenses[]>([])
    const [ctzs, setCtzs] = useState<CtzGlobalProp[]>([])    
    const [ingredients, setIngredients] = useState<Ingredients[]>([])    
    const [recipeToShow, setRecipeToShow] = useState<Recipe | null>(null)
    const { ingredients: currentIngredientes, loading:ingredientsLoading } = useGetIngredients()

    useEffect(() => {
      if(currentIngredientes) {
        setIngredients(currentIngredientes)
      }
    },[currentIngredientes])

  return (
    <CotizadorActionsContext.Provider
      value={{            
        setRecipes,
        setExpenses,
        setCtzs,
        setIngredients,
        setRecipeToShow
      }}
      >
        <CotizadorStateContext.Provider
        value={{
            recipes,
            ctzs,
            expenses,
            ingredients,
            ctzUser,
            uid,
            userInfo,
            userLoading,
            ingredientsLoading,
            recipeToShow
        }}
        >
            {children}  
        </CotizadorStateContext.Provider>
    </CotizadorActionsContext.Provider>
  )
}

export default CotizadorGlobalComponent