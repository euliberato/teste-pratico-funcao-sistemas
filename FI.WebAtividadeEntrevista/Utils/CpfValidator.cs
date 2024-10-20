using System.Linq;
using System.Web;

namespace WebAtividadeEntrevista.Utils
{ 
    public class CpfValidator
    {
        public static bool Validator(string cpf)
        {

            if (cpf.Length != 11)
                return false;

            if (new string(cpf[0], 11) == cpf)
                return false;

            int[] pesoDecrescente10 = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int somatorio = 0;
            for (int i = 0; i < 9; i++)
            {
                somatorio += int.Parse(cpf[i].ToString()) * pesoDecrescente10[i];
            }
            int mod = somatorio % 11;
            int primeiroDigito = mod < 2 ? 0 : 11 - mod;

            if (primeiroDigito != int.Parse(cpf[9].ToString()))
                return false;  

            int[] pesoDecrescente11 = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            somatorio = 0;
            for (int i = 0; i < 10; i++)
            {
                somatorio += int.Parse(cpf[i].ToString()) * pesoDecrescente11[i];
            }
            mod = somatorio % 11;
            int segundoDigito = mod < 2 ? 0 : 11 - mod;

            string resultado = primeiroDigito.ToString() + segundoDigito.ToString();

            string digitosVerificadores = cpf.Substring(cpf.Length - 2);

            if (string.Equals(digitosVerificadores, resultado))
                return true;

            return false;

        }
    }
}