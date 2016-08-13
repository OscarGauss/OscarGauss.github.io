import java.util.*;
import java.math.BigInteger;
public class MR{
	public static boolean esPrimoMR(BigInteger N)
	{
		BigInteger N1 = N.subtract(BigInteger.ONE);//N-1
		BigInteger DOS = new BigInteger("2");
		int[] primo = {2,3,5,7,11,13,17,19,23,29,31,37};
		int s = 0;
		boolean esPrimo = true;
		BigInteger a,r,y;
		int j;
		while(N1.remainder(DOS).compareTo(BigInteger.ZERO)==0)//n-1 = 2^s r
			{
				N1=N1.divide(DOS);
				s=s+1;
			}
		r= N1;
		System.out.println("s:"+s+"N1:" +N1);
		N1 = N.subtract(BigInteger.ONE);
		for(int i=0; i<=11; i++)
			{
				a = new BigInteger(""+primo[i]);
				y = a.modPow(r, N);
				System.out.println(y);
				if( y.compareTo(BigInteger.ONE)!=0 && y.compareTo(N1)!=0)
					{ j=1;
						while(j<= s-1 && y.compareTo(N1)!=0 )
							{
								
								y = y.modPow(DOS, N);
								System.out.println("prime: "+a+" "+" u: "+ y);
								if(y.compareTo(BigInteger.ONE)==0) esPrimo=false;
								j++;
							}
						System.out.println(y+" igal:? "+N1);
						if(y.compareTo(N1)!=0) esPrimo = false;
					}
			}
		return esPrimo;
	}
	public static void main(String [] args){
	      Scanner l=new Scanner(System.in);
	      BigInteger N=l.nextBigInteger();
	      System.out.println(N+" "+esPrimoMR(N));
	}
}
