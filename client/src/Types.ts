import React from "react"

export interface ApiResponseCreateLink {
    id: Number,
    ownerId?: Number,
    longURL: String,
    ShortURL: String,
    createdAt: String,
    updatedAt: String
}
export interface NavigationTypes {
    handlerClick: (query: string) => void
    activeTab: string
}
export interface userFieldProfile {
    first_name: string,
    last_name: string,
    email: string
}
