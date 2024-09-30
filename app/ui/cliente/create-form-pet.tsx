"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function PetRegistrationForm(props: any) {
    const [petType, setPetType] = useState("")
    const [porte, setSize] = useState("")
    const [idade, setAge] = useState("")
    const [pelo, setPelo] = useState("")

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("Form submitted", { petType, porte, idade, pelo })
    }

    //   const neumorphicStyle = "bg-gray-100 border-gray-200 shadow-[inset_-5px_-5px_10px_rgba(255,255,255,0.7),inset_5px_5px_10px_rgba(0,0,0,0.1)] rounded-xl"
    //   const neumorphicInputStyle = "bg-transparent border-none focus:ring-0 focus:border-none"

    return (
        <div className="relative flex items-center justify-center bg-gray-100 p-4">
            <div className={`w-full max-w-[80%] p-8`}>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Cadastro de Pet</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="cliente" className="text-gray-700">ID do cliente</Label>
                            <Input id="cliente" name="cliente"
                                placeholder={props.idCliente}
                                value={props.idCliente}
                                type="text" disabled />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type" className="text-gray-700">Tipo</Label>
                            <Select name="type" value={petType} onValueChange={setPetType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dog">Cão</SelectItem>
                                    <SelectItem value="cat">Gato</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-700">Nome</Label>
                            <Input id="name" name="name" type="text" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="breed" className="text-gray-700">Raça</Label>
                            <Input id="breed" name="breed" type="text" />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="characteristics" className="text-gray-700">Características</Label>
                            <Textarea id="characteristics" name="characteristics" />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="observations" className="text-gray-700">Observações</Label>
                            <Textarea id="observations" name="observations" />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-gray-700">Porte</Label>
                            <RadioGroup value={porte} onValueChange={setSize} className="flex space-x-4">
                                {['P', 'M', 'G'].map((option) => (
                                    <div key={option} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option} id={`porte-${option}`} className={`w-5 h-5`} />
                                        <Label htmlFor={`porte-${option}`} className="text-gray-700">{option}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-gray-700">Idade</Label>
                            <RadioGroup value={idade} onValueChange={setAge} className="flex space-x-4">
                                {['Filhote', 'Adulto', 'Idoso'].map((option) => (
                                    <div key={option} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option} id={`idade-${option}`} className={`w-5 h-5`} />
                                        <Label htmlFor={`idade-${option}`} className="text-gray-700">{option}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-gray-700">Pelagem</Label>
                            <RadioGroup value={pelo} onValueChange={setPelo} className="flex space-x-4">
                                {['Curto', 'Médio', 'Longo'].map((option) => (
                                    <div key={option} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option} id={`pelo-${option}`} className={` w-5 h-5`} />
                                        <Label htmlFor={`pelo-${option}`} className="text-gray-700">{option}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>

                    <Button type="submit" className={`w-full  hover:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)] text-gray-800 font-semibold py-3 transition-all duration-300`}>
                        Cadastrar Pet
                    </Button>
                </form>
            </div>
        </div>
    )
}