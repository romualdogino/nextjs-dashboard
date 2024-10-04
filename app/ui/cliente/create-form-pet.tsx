"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { createPet } from '@/app/lib/data-mongodb'

export default function PetRegistrationForm(props: any) {
    const [tipo, setTipo] = useState("")
    const [porte, setPorte] = useState("")
    const [idade, setIdade] = useState("")
    const [pelo, setPelo] = useState("")
    // setTimeout(() => {
        
    //     console.log({ props })
    // }, 2000);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData.entries())
        const pet = {
            tutorId: props.idCliente,
            // tutor: props.cliente.name,
            tipo,
            nome: data.nome,
            caracteristica: data.caracteristica,
            obs: data.obs,
            porte,
            idade,
            raca: data.tipo
        }
        // console.log("Form submitted", { data })
        console.log("Form submitted", { pet })
        const response = await createPet(pet)
        console.log({response})

        // console.log("Form submitted", { tipo, porte, idade, pelo })
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
                            <Select name="type" value={tipo} onValueChange={setTipo}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cao">Cão</SelectItem>
                                    <SelectItem value="gato">Gato</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nome" className="text-gray-700">Nome</Label>
                            <Input id="nome" name="nome" type="text" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tipo" className="text-gray-700">Raça</Label>
                            <Input id="tipo" name="tipo" type="text" />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="caracteristica" className="text-gray-700">Características</Label>
                            <Textarea id="caracteristica" name="caracteristica" />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="obs" className="text-gray-700">Observações</Label>
                            <Textarea id="obs" name="obs" />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-gray-700">Porte</Label>
                            <RadioGroup value={porte} onValueChange={setPorte} className="flex space-x-4">
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
                            <RadioGroup value={idade} onValueChange={setIdade} className="flex space-x-4">
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