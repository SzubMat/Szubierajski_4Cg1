import java.util.ArrayList;

public class Main{
    public static void main(String[] args){
        ArrayList<Produkt> magazyn = new ArrayList<>();

        Produkt produkt1 = new ArtSpozywczy(
            "Chleb",6.99,"30.09.2026","Pono"
        );

        Produkt produkt2 = new Elektronika(
            "Telefon",700.0,12,"Hawai"
        );

        magazyn.add(produkt1);
        magazyn.add(produkt2);

        for (Produkt produkt : magazyn){
            produkt.wyswietlInformacje();
            System.out.print("\n");
        }
    }
}
class Sklep{
    private String nazwa;
    private int nrSklepu;
    private int listaProduktow;

    public Sklep(String nazwa,int nrSklepu){
        this.nazwa = nazwa;
        this.nrSklepu =nrSklepu;
    }
    
    public void showData(){
        System.out.println(nazwa);
        System.out.println(nrSklepu);
        System.out.println(listaProduktow);
    }
}

class Produkt{
    protected String nazwa;
    protected double cena;

    public Produkt(String nazwa, double cena){
        this.nazwa = nazwa;
        this.cena = cena;
    }

    public void wyswietlInformacje(){
        System.out.println("produkt: " + nazwa +"/n"+ "cena: " + cena);
    }
}

class ArtSpozywczy extends Produkt{
    private String dataWaznosci;
    private String producent;

    public ArtSpozywczy(String nazwa, double cena, String dataWaznosci, String producent){
        super(nazwa,cena);
        this.dataWaznosci = dataWaznosci;
        this.producent = producent;
    }

    @Override
    public void wyswietlInformacje(){
        super.wyswietlInformacje();

        System.out.println("data waznosci do: "+dataWaznosci +"/n"+"producent: "+ producent);
    }
}

class Elektronika extends Produkt{
    private int gwarancjaMiesiac;
    private String marka;

    public Elektronika(String nazwa, double cena, int gwarancjaMiesiac,String marka){
        super(nazwa,cena);
        this.gwarancjaMiesiac = gwarancjaMiesiac;
        this.marka = marka;
    }
    @Override 
    public void wyswietlInformacje(){
        super.wyswietlInformacje();
    
        System.out.println("nazwa "+nazwa+" gwarancja na: "+gwarancjaMiesiac+" miesiency");
        System.out.println("marka: "+marka); 
    }
}

